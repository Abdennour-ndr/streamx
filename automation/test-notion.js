const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function checkDatabaseStructure() {
  try {
    console.log('🔍 التحقق من هيكل قاعدة البيانات...');
    
    const database = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    const requiredProperties = {
      'Title': 'title',
      'Content': 'rich_text',
      'Date': 'date',
      'Type': 'select',
      'Status': 'select',
      'Priority': 'select',
      'Assigned': 'people',
      'Progress': 'number'
    };

    const missingProperties = {};
    for (const [name, type] of Object.entries(requiredProperties)) {
      if (!database.properties[name]) {
        missingProperties[name] = type;
      }
    }

    if (Object.keys(missingProperties).length > 0) {
      console.log('⚠️ بعض الأعمدة المطلوبة غير موجودة. جاري إضافتها...');
      await updateDatabaseStructure(missingProperties);
    } else {
      console.log('✅ هيكل قاعدة البيانات مكتمل!');
    }

    return true;
  } catch (error) {
    console.error('❌ خطأ في التحقق من هيكل قاعدة البيانات:', error);
    return false;
  }
}

async function updateDatabaseStructure(missingProperties) {
  try {
    const properties = {};
    
    for (const [name, type] of Object.entries(missingProperties)) {
      switch (type) {
        case 'title':
          properties[name] = { title: {} };
          break;
        case 'rich_text':
          properties[name] = { rich_text: {} };
          break;
        case 'date':
          properties[name] = { date: {} };
          break;
        case 'select':
          properties[name] = {
            select: {
              options: [
                { name: 'Pending', color: 'gray' },
                { name: 'In Progress', color: 'blue' },
                { name: 'Completed', color: 'green' },
                { name: 'High', color: 'red' },
                { name: 'Medium', color: 'yellow' },
                { name: 'Low', color: 'green' }
              ]
            }
          };
          break;
        case 'people':
          properties[name] = { people: {} };
          break;
        case 'number':
          properties[name] = { 
            number: {
              format: 'percent'
            }
          };
          break;
      }
    }

    await notion.databases.update({
      database_id: process.env.NOTION_DATABASE_ID,
      properties
    });

    console.log('✅ تم تحديث هيكل قاعدة البيانات بنجاح!');
  } catch (error) {
    console.error('❌ خطأ في تحديث هيكل قاعدة البيانات:', error);
  }
}

async function testNotionIntegration() {
  try {
    // التحقق من هيكل قاعدة البيانات أولاً
    await checkDatabaseStructure();

    console.log('🔍 اختبار التكامل مع Notion...');
    
    // محاولة إنشاء صفحة اختبار
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: 'اختبار النظام الآلي',
              },
            },
          ],
        },
        Content: {
          rich_text: [
            {
              text: {
                content: 'تم إنشاء هذه الصفحة تلقائياً بواسطة نظام الأتمتة.',
              },
            },
          ],
        },
        Date: {
          date: {
            start: new Date().toISOString(),
          },
        },
        Type: {
          select: {
            name: 'Test',
          },
        },
        Status: {
          select: {
            name: 'Completed',
          },
        },
        Priority: {
          select: {
            name: 'Medium',
          },
        },
        Progress: {
          number: 100,
        },
      },
    });

    console.log('✅ تم إنشاء صفحة الاختبار بنجاح!');
    console.log('📝 معرف الصفحة:', response.id);
    
    return true;
  } catch (error) {
    console.error('❌ خطأ في التكامل مع Notion:', error);
    return false;
  }
}

// تشغيل الاختبار
testNotionIntegration(); 