// Test script for StreamX platform functionality
// This script will test various core features of the platform

// Import required modules
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define test results output file
const TEST_RESULTS_FILE = path.join(__dirname, 'test_results.md');

// Helper function to write test results
function writeTestResult(testName, status, details = '') {
  const result = `## ${testName}\n**Status:** ${status}\n${details ? `**Details:** ${details}\n` : ''}\n`;
  fs.appendFileSync(TEST_RESULTS_FILE, result);
}

// Initialize test results file
fs.writeFileSync(TEST_RESULTS_FILE, '# StreamX Platform Test Results\n\n');

// Test project structure
function testProjectStructure() {
  console.log('Testing project structure...');
  
  try {
    // Check for essential directories
    const requiredDirs = [
      'src/app',
      'src/components',
      'src/lib',
      'migrations',
      'public'
    ];
    
    let allDirsExist = true;
    const missingDirs = [];
    
    for (const dir of requiredDirs) {
      const fullPath = path.join(__dirname, dir);
      if (!fs.existsSync(fullPath)) {
        allDirsExist = false;
        missingDirs.push(dir);
      }
    }
    
    // Check for essential files
    const requiredFiles = [
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'migrations/0001_initial.sql',
      'package.json',
      'next.config.ts',
      'tailwind.config.ts'
    ];
    
    let allFilesExist = true;
    const missingFiles = [];
    
    for (const file of requiredFiles) {
      const fullPath = path.join(__dirname, file);
      if (!fs.existsSync(fullPath)) {
        allFilesExist = false;
        missingFiles.push(file);
      }
    }
    
    if (allDirsExist && allFilesExist) {
      writeTestResult('Project Structure', 'PASS', 'All required directories and files exist.');
    } else {
      let details = '';
      if (missingDirs.length > 0) {
        details += `Missing directories: ${missingDirs.join(', ')}\n`;
      }
      if (missingFiles.length > 0) {
        details += `Missing files: ${missingFiles.join(', ')}`;
      }
      writeTestResult('Project Structure', 'FAIL', details);
    }
  } catch (error) {
    writeTestResult('Project Structure', 'ERROR', error.message);
  }
}

// Test frontend components
function testFrontendComponents() {
  console.log('Testing frontend components...');
  
  try {
    // Check for essential component categories
    const componentCategories = [
      'layout',
      'shared',
      'auth',
      'cinematic',
      'creator',
      'player'
    ];
    
    let allCategoriesExist = true;
    const missingCategories = [];
    
    for (const category of componentCategories) {
      const fullPath = path.join(__dirname, 'src/components', category);
      if (!fs.existsSync(fullPath)) {
        allCategoriesExist = false;
        missingCategories.push(category);
      }
    }
    
    // Check for key components
    const keyComponents = [
      'layout/MainLayout.tsx',
      'layout/Navbar.tsx',
      'layout/Footer.tsx',
      'shared/ContentCard.tsx',
      'shared/ContentGrid.tsx',
      'shared/HeroSection.tsx',
      'auth/SignInForm.tsx',
      'auth/SignUpForm.tsx',
      'auth/AuthGuard.tsx',
      'cinematic/MovieCard.tsx',
      'cinematic/ContentDetails.tsx',
      'creator/LiveStreamCard.tsx',
      'creator/CreatorProfileCard.tsx',
      'player/VideoPlayer.tsx'
    ];
    
    let allComponentsExist = true;
    const missingComponents = [];
    
    for (const component of keyComponents) {
      const fullPath = path.join(__dirname, 'src/components', component);
      if (!fs.existsSync(fullPath)) {
        allComponentsExist = false;
        missingComponents.push(component);
      }
    }
    
    if (allCategoriesExist && allComponentsExist) {
      writeTestResult('Frontend Components', 'PASS', 'All required component categories and key components exist.');
    } else {
      let details = '';
      if (missingCategories.length > 0) {
        details += `Missing component categories: ${missingCategories.join(', ')}\n`;
      }
      if (missingComponents.length > 0) {
        details += `Missing key components: ${missingComponents.join(', ')}`;
      }
      writeTestResult('Frontend Components', 'FAIL', details);
    }
  } catch (error) {
    writeTestResult('Frontend Components', 'ERROR', error.message);
  }
}

// Test core features
function testCoreFeatures() {
  console.log('Testing core features...');
  
  try {
    // Check for API implementations
    const apiFiles = [
      'lib/api/contentApi.ts',
      'lib/api/userApi.ts',
      'lib/api/liveStreamApi.ts',
      'lib/api/subscriptionApi.ts'
    ];
    
    let allApisExist = true;
    const missingApis = [];
    
    for (const api of apiFiles) {
      const fullPath = path.join(__dirname, 'src', api);
      if (!fs.existsSync(fullPath)) {
        allApisExist = false;
        missingApis.push(api);
      }
    }
    
    // Check for AI recommendation engine
    const aiFiles = [
      'lib/ai/recommendationEngine.ts',
      'lib/ai/RecommendationContext.tsx'
    ];
    
    let allAiFilesExist = true;
    const missingAiFiles = [];
    
    for (const file of aiFiles) {
      const fullPath = path.join(__dirname, 'src', file);
      if (!fs.existsSync(fullPath)) {
        allAiFilesExist = false;
        missingAiFiles.push(file);
      }
    }
    
    // Check for authentication implementation
    const authFiles = [
      'lib/auth/AuthContext.tsx'
    ];
    
    let allAuthFilesExist = true;
    const missingAuthFiles = [];
    
    for (const file of authFiles) {
      const fullPath = path.join(__dirname, 'src', file);
      if (!fs.existsSync(fullPath)) {
        allAuthFilesExist = false;
        missingAuthFiles.push(file);
      }
    }
    
    if (allApisExist && allAiFilesExist && allAuthFilesExist) {
      writeTestResult('Core Features', 'PASS', 'All required API, AI, and authentication implementations exist.');
    } else {
      let details = '';
      if (missingApis.length > 0) {
        details += `Missing API implementations: ${missingApis.join(', ')}\n`;
      }
      if (missingAiFiles.length > 0) {
        details += `Missing AI files: ${missingAiFiles.join(', ')}\n`;
      }
      if (missingAuthFiles.length > 0) {
        details += `Missing authentication files: ${missingAuthFiles.join(', ')}`;
      }
      writeTestResult('Core Features', 'FAIL', details);
    }
  } catch (error) {
    writeTestResult('Core Features', 'ERROR', error.message);
  }
}

// Test page implementations
function testPageImplementations() {
  console.log('Testing page implementations...');
  
  try {
    // Check for essential pages
    const essentialPages = [
      'app/page.tsx',
      'app/page.client.tsx',
      'app/[category]/[id]/page.client.tsx',
      'app/auth/signin/page.tsx',
      'app/auth/signup/page.tsx'
    ];
    
    let allPagesExist = true;
    const missingPages = [];
    
    for (const page of essentialPages) {
      const fullPath = path.join(__dirname, 'src', page);
      if (!fs.existsSync(fullPath)) {
        allPagesExist = false;
        missingPages.push(page);
      }
    }
    
    if (allPagesExist) {
      writeTestResult('Page Implementations', 'PASS', 'All essential pages exist.');
    } else {
      writeTestResult('Page Implementations', 'FAIL', `Missing pages: ${missingPages.join(', ')}`);
    }
  } catch (error) {
    writeTestResult('Page Implementations', 'ERROR', error.message);
  }
}

// Test build process
function testBuildProcess() {
  console.log('Testing build process...');
  
  try {
    // Run a build to check for compilation errors
    execSync('npm run build', { stdio: 'pipe' });
    writeTestResult('Build Process', 'PASS', 'Application builds successfully without errors.');
  } catch (error) {
    writeTestResult('Build Process', 'FAIL', `Build failed with error: ${error.message}`);
  }
}

// Run all tests
function runAllTests() {
  console.log('Starting StreamX platform tests...');
  
  testProjectStructure();
  testFrontendComponents();
  testCoreFeatures();
  testPageImplementations();
  // Uncomment to test build process (may take longer)
  // testBuildProcess();
  
  console.log(`All tests completed. Results saved to ${TEST_RESULTS_FILE}`);
}

// Execute tests
runAllTests();
