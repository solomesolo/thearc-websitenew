import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { 
  TESTS, 
  MEAL_PLANS, 
  SUPPS_CANONICAL, 
  BREATH_LIBRARY, 
  PHASE_TEMPLATES 
} from './blocks';

export interface PDFGenerationData {
  user: {
    name: string;
    age: number;
    sex: string;
    email?: string;
  };
  scores: {
    family_risk: number;
    physiological: number;
    lifestyle_load: number;
    biological: number;
    cognitive: number;
  };
  explanations: {
    explanations: {
      family_risk: string;
      physiological: string;
      lifestyle_load: string;
      biological: string;
      cognitive: string;
    };
  };
  screenings?: Array<{
    name: string;
    why: string;
    when: string;
  }>;
  nutrition?: {
    archetype: string;
    principles: string[];
    days: Array<{
      day: number;
      breakfast: string;
      lunch: string;
      dinner: string;
      snacks: string[];
    }>;
  };
  supplements?: Array<{
    name: string;
    dose: string;
    timing: string;
    why: string;
    safety: string;
  }>;
  breath_recovery?: Array<{
    name: string;
    how: string;
  }>;
  months?: Array<{
    name: string;
    goal: string;
    why: string;
    daily: string[];
    weekly_reflection: string;
  }>;
  executive_summary: string;
  disclaimer: string;
}

export class PDFGenerator {
  private browser: puppeteer.Browser | null = null;

  async initialize(): Promise<void> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });
    }
  }

  async generatePDF(data: PDFGenerationData): Promise<Buffer> {
    await this.initialize();
    
    if (!this.browser) {
      throw new Error('Browser not initialized');
    }

    const page = await this.browser.newPage();
    
    try {
      // Load the HTML template
      const templatePath = path.join(process.cwd(), 'templates', 'blueprint.html');
      const cssPath = path.join(process.cwd(), 'templates', 'styles.css');
      
      let htmlContent = fs.readFileSync(templatePath, 'utf8');
      const cssContent = fs.readFileSync(cssPath, 'utf8');
      
      // Replace template variables with actual data
      htmlContent = this.replaceTemplateVariables(htmlContent, data);
      
      // Inject CSS
      htmlContent = htmlContent.replace(
        '<link rel="stylesheet" href="styles.css">',
        `<style>${cssContent}</style>`
      );
      
      // Set content and wait for it to load
      await page.setContent(htmlContent, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      
      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '2cm',
          right: '2cm',
          bottom: '2cm',
          left: '2cm'
        },
        displayHeaderFooter: false,
        preferCSSPageSize: true
      });
      
      return pdfBuffer;
      
    } finally {
      await page.close();
    }
  }

  private replaceTemplateVariables(html: string, data: PDFGenerationData): string {
    let result = html;
    
    // Replace user data
    result = result.replace(/\{\{user\.name\}\}/g, data.user.name);
    result = result.replace(/\{\{user\.age\}\}/g, data.user.age.toString());
    result = result.replace(/\{\{user\.sex\}\}/g, data.user.sex);
    result = result.replace(/\{\{date\}\}/g, new Date().toLocaleDateString());
    
    // Replace executive summary
    result = result.replace(/\{\{executive_summary\}\}/g, data.executive_summary);
    
    // Replace disclaimer
    result = result.replace(/\{\{disclaimer\}\}/g, data.disclaimer);
    
    // Replace scores section with proper template syntax
    if (data.scores && data.explanations) {
      const scoresHtml = this.generateScoresHTML(data.scores, data.explanations);
      result = result.replace(/\{\{#each scores\}\}[\s\S]*?\{\{\/each\}\}/g, scoresHtml);
    }
    
    // Replace screenings section
    if (data.screenings && data.screenings.length > 0) {
      const screeningsHtml = this.generateScreeningsHTML(data.screenings);
      result = result.replace(/\{\{#if screenings\}\}[\s\S]*?\{\{\/if\}\}/g, screeningsHtml);
    } else {
      result = result.replace(/\{\{#if screenings\}\}[\s\S]*?\{\{\/if\}\}/g, '');
    }
    
    // Replace nutrition section
    if (data.nutrition) {
      const nutritionHtml = this.generateNutritionHTML(data.nutrition);
      result = result.replace(/\{\{#if nutrition\}\}[\s\S]*?\{\{\/if\}\}/g, nutritionHtml);
    } else {
      result = result.replace(/\{\{#if nutrition\}\}[\s\S]*?\{\{\/if\}\}/g, '');
    }
    
    // Replace supplements section
    if (data.supplements && data.supplements.length > 0) {
      const supplementsHtml = this.generateSupplementsHTML(data.supplements);
      result = result.replace(/\{\{#if supplements\}\}[\s\S]*?\{\{\/if\}\}/g, supplementsHtml);
    } else {
      result = result.replace(/\{\{#if supplements\}\}[\s\S]*?\{\{\/if\}\}/g, '');
    }
    
    // Replace breathwork section
    if (data.breath_recovery && data.breath_recovery.length > 0) {
      const breathworkHtml = this.generateBreathworkHTML(data.breath_recovery);
      result = result.replace(/\{\{#if breath_recovery\}\}[\s\S]*?\{\{\/if\}\}/g, breathworkHtml);
    } else {
      result = result.replace(/\{\{#if breath_recovery\}\}[\s\S]*?\{\{\/if\}\}/g, '');
    }
    
    // Replace months section
    if (data.months && data.months.length > 0) {
      const monthsHtml = this.generateMonthsHTML(data.months);
      result = result.replace(/\{\{#if months\}\}[\s\S]*?\{\{\/if\}\}/g, monthsHtml);
    } else {
      result = result.replace(/\{\{#if months\}\}[\s\S]*?\{\{\/if\}\}/g, '');
    }
    
    return result;
  }

  private generateScoresHTML(scores: any, explanations: any): string {
    let html = '';
    
    Object.entries(scores).forEach(([key, value]) => {
      // Handle different explanation structures
      let explanation = 'No explanation available.';
      if (explanations && explanations.explanations && explanations.explanations[key]) {
        explanation = explanations.explanations[key];
      } else if (explanations && explanations[key]) {
        explanation = explanations[key];
      }
      
      const displayName = this.getScoreDisplayName(key);
      html += `
        <div class="score-card">
          <div class="score-title">${displayName}</div>
          <div class="score-value">${value}</div>
          <div class="score-explanation">${explanation}</div>
        </div>
      `;
    });
    
    return html;
  }

  private getScoreDisplayName(key: string): string {
    const displayNames: { [key: string]: string } = {
      'family_risk': 'Family/Cardiovascular Risk',
      'physiological': 'Physiological Pattern (autonomic balance)',
      'lifestyle_load': 'Lifestyle Load (perceived stress)',
      'biological': 'Biological Risk (behavioural/anthropometric/lab)',
      'cognitive': 'Cognitive Rhythm (focus & well-being)'
    };
    return displayNames[key] || key.replace(/_/g, ' ').toUpperCase();
  }

  private generateScreeningsHTML(screenings: Array<{name: string, why: string, when: string}>): string {
    let html = `
      <div class="page">
        <h2 class="section-title">Recommended Screenings</h2>
        <div class="screenings-list">
    `;
    
    screenings.forEach(screening => {
      html += `
        <div class="screening-item">
          <h3 class="screening-name">${screening.name}</h3>
          <div class="screening-why"><strong>Why:</strong> ${screening.why}</div>
          <div class="screening-when"><strong>When:</strong> ${screening.when}</div>
        </div>
      `;
    });
    
    html += '</div></div>';
    return html;
  }

  private generateNutritionHTML(nutrition: any): string {
    let html = `
      <div class="page">
        <h2 class="section-title">Nutrition Plan: ${nutrition.archetype}</h2>
        <div class="nutrition-principles">
          <h3>Principles:</h3>
          <ul>
    `;
    
    nutrition.principles.forEach((principle: string) => {
      html += `<li>${principle}</li>`;
    });
    
    html += `
          </ul>
        </div>
        <div class="nutrition-days">
    `;
    
    nutrition.days.forEach((day: any) => {
      html += `
        <div class="nutrition-day">
          <h4>Day ${day.day}</h4>
          <div class="meal"><strong>Breakfast:</strong> ${day.breakfast}</div>
          <div class="meal"><strong>Lunch:</strong> ${day.lunch}</div>
          <div class="meal"><strong>Dinner:</strong> ${day.dinner}</div>
          <div class="meal"><strong>Snacks:</strong> ${day.snacks.join(', ')}</div>
        </div>
      `;
    });
    
    html += '</div></div>';
    return html;
  }

  private generateSupplementsHTML(supplements: Array<{name: string, dose: string, timing: string, why: string, safety: string}>): string {
    let html = `
      <div class="page">
        <h2 class="section-title">Baseline Supplements</h2>
        <div class="supplements-list">
    `;
    
    supplements.forEach(supplement => {
      html += `
        <div class="supplement-item">
          <h3 class="supplement-name">${supplement.name}</h3>
          <div class="supplement-details">
            <div class="supplement-dose"><strong>Dose:</strong> ${supplement.dose}</div>
            <div class="supplement-timing"><strong>Timing:</strong> ${supplement.timing}</div>
            <div class="supplement-why"><strong>Why:</strong> ${supplement.why}</div>
            <div class="supplement-safety"><strong>Safety:</strong> ${supplement.safety}</div>
          </div>
        </div>
      `;
    });
    
    html += '</div></div>';
    return html;
  }

  private generateBreathworkHTML(breathwork: Array<{name: string, how: string}>): string {
    let html = `
      <div class="page">
        <h2 class="section-title">Breathwork & Recovery</h2>
        <div class="breathwork-list">
    `;
    
    breathwork.forEach(technique => {
      html += `
        <div class="breathwork-item">
          <h3 class="breathwork-name">${technique.name}</h3>
          <div class="breathwork-how"><strong>How:</strong> ${technique.how}</div>
        </div>
      `;
    });
    
    html += '</div></div>';
    return html;
  }

  private generateMonthsHTML(months: Array<{name: string, goal: string, why: string, daily: string[], weekly_reflection: string}>): string {
    let html = `
      <div class="page">
        <h2 class="section-title">Monthly Modules</h2>
        <div class="modules-list">
    `;
    
    months.forEach(month => {
      html += `
        <div class="module-item">
          <h3 class="module-name">${month.name}</h3>
          <div class="module-goal"><strong>Goal:</strong> ${month.goal}</div>
          <div class="module-why"><strong>Why:</strong> ${month.why}</div>
          <div class="module-daily">
            <strong>Daily Actions:</strong>
            <ul>
      `;
      
      month.daily.forEach(action => {
        html += `<li>${action}</li>`;
      });
      
      html += `
            </ul>
          </div>
          <div class="module-reflection">
            <strong>Weekly Reflection:</strong> ${month.weekly_reflection}
          </div>
        </div>
      `;
    });
    
    html += '</div></div>';
    return html;
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
