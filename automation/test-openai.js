const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAIIntegration() {
  try {
    console.log('🔍 اختبار التكامل مع OpenAI...');
    
    // اختبار إنشاء محتوى
    const contentResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "أنت مساعد ذكي يساعد في إدارة مشروع StreamX."
        },
        {
          role: "user",
          content: "قم بإنشاء تقرير موجز عن حالة المشروع الحالية."
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const generatedContent = contentResponse.choices[0].message.content;
    console.log('📝 المحتوى المُنشأ:', generatedContent);

    // اختبار تحليل الكود
    const codeAnalysisResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "أنت محلل كود محترف."
        },
        {
          role: "user",
          content: "قم بتحليل الكود التالي وتقديم اقتراحات للتحسين:\n\n" +
            "function example() {\n" +
            "  let x = 5;\n" +
            "  console.log(x);\n" +
            "}"
        }
      ],
      temperature: 0.5,
      max_tokens: 300
    });

    const codeAnalysis = codeAnalysisResponse.choices[0].message.content;
    console.log('🔍 تحليل الكود:', codeAnalysis);

    // اختبار إنشاء محتوى تسويقي
    const marketingResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "أنت خبير تسويق رقمي."
        },
        {
          role: "user",
          content: "قم بإنشاء منشور تسويقي جذاب لـ StreamX."
        }
      ],
      temperature: 0.8,
      max_tokens: 200
    });

    const marketingContent = marketingResponse.choices[0].message.content;
    console.log('📢 المحتوى التسويقي:', marketingContent);

    console.log('✅ تم اختبار التكامل مع OpenAI بنجاح!');
    return true;
  } catch (error) {
    console.error('❌ خطأ في التكامل مع OpenAI:', error);
    return false;
  }
}

// تشغيل الاختبار
testOpenAIIntegration(); 