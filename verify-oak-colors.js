// Simple script to verify Oak color classes are working
console.log('Testing Oak color palette...');

// Test that CSS variables are defined
const rootStyles = getComputedStyle(document.documentElement);
const oakColors = [
  'color-oak-50',
  'color-oak-100', 
  'color-oak-200',
  'color-oak-300',
  'color-oak-400',
  'color-oak-500',
  'color-oak-600',
  'color-oak-700',
  'color-oak-800',
  'color-oak-900'
];

console.log('Checking CSS variables...');
oakColors.forEach(colorVar => {
  const value = rootStyles.getPropertyValue(`--${colorVar}`).trim();
  console.log(`${colorVar}: ${value}`);
  if (!value || value === '') {
    console.error(`❌ Missing CSS variable: --${colorVar}`);
  } else {
    console.log(`✅ CSS variable --${colorVar} is defined: ${value}`);
  }
});

// Test that utility classes are defined
const styleSheets = document.styleSheets;
let foundOakClasses = false;

for (let i = 0; i < styleSheets.length; i++) {
  try {
    const rules = styleSheets[i].cssRules;
    for (let j = 0; j < rules.length; j++) {
      const rule = rules[j];
      if (rule.selectorText && rule.selectorText.includes('oak-')) {
        console.log(`✅ Found Oak class: ${rule.selectorText}`);
        foundOakClasses = true;
      }
    }
  } catch (e) {
    console.log('Could not access stylesheet:', e.message);
  }
}

if (!foundOakClasses) {
  console.error('❌ No Oak color classes found in stylesheets');
} else {
  console.log('✅ Oak color classes are present in stylesheets');
}

// Test specific elements that should have Oak colors
const testElements = [
  { selector: 'body', expectedBg: 'oak-50', expectedText: 'oak-900' },
  { selector: 'header', expectedBg: 'oak-800' },
  { selector: '#importModeButton', expectedBg: 'oak-200', expectedText: 'oak-700' }
];

console.log('\nTesting element styling...');
testElements.forEach(({ selector, expectedBg, expectedText }) => {
  const element = document.querySelector(selector);
  if (element) {
    const computedStyle = getComputedStyle(element);
    
    if (expectedBg) {
      const bgColor = computedStyle.backgroundColor;
      console.log(`Element ${selector} background: ${bgColor}`);
    }
    
    if (expectedText) {
      const textColor = computedStyle.color;
      console.log(`Element ${selector} text color: ${textColor}`);
    }
  } else {
    console.log(`Element ${selector} not found`);
  }
});

console.log('Oak color palette test completed.');