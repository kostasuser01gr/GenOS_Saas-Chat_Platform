import { ChatMessage, BlockType, UIComponent } from '../types';

export function optimizeBlockLayout(components: UIComponent[]): UIComponent[] {
  const count = components.length;
  return components.map((comp, index) => {
    let layout = 'col-span-12';
    
    switch (count) {
      case 1:
        layout = 'col-span-12';
        break;
      case 2:
        layout = 'col-span-12 lg:col-span-6';
        break;
      case 3:
        layout = 'col-span-12 lg:col-span-4';
        break;
      case 4:
        layout = 'col-span-12 lg:col-span-6';
        break;
      case 5:
        // Top 2 larger, bottom 3 smaller
        layout = index < 2 ? 'col-span-12 lg:col-span-6' : 'col-span-12 lg:col-span-4';
        break;
      case 6:
        layout = 'col-span-12 lg:col-span-4';
        break;
      case 7:
        // 1 large, 3 medium, 3 medium
        layout = index === 0 ? 'col-span-12' : 'col-span-12 lg:col-span-4';
        break;
      default:
        // Default to a 3-column grid for larger numbers
        layout = 'col-span-12 lg:col-span-4';
    }

    return { ...comp, layout };
  });
}

export async function generateResponse(prompt: string): Promise<ChatMessage['response']> {
  const lower = prompt.toLowerCase();
  
  // Fake latency for "thinking" to simulate agent operation
  await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000));

  if (lower.includes('manage') || lower.includes('expansion') || lower.includes('regional') || lower.includes('budget')) {
    return { 
      type: 'composite', 
      title: 'Regional Expansion Hub',
      text: 'Composing interface for Regional Expansion Hub. Initializing lead data hooks and budget models...',
      components: [
        { id: '1', type: 'map', title: 'Regional Lead Heatmap', layout: 'col-span-12 lg:col-span-8' },
        { id: '2', type: 'radar', title: 'Efficiency Index', layout: 'col-span-12 lg:col-span-4' },
        { id: '3', type: 'budget_variance', title: 'Budget Variance Computation', layout: 'col-span-12' }
      ]
    };
  }

  if (lower.includes('commerce') || lower.includes('funnel') || lower.includes('conversion')) {
    return {
      type: 'composite',
      title: 'E-Commerce Conversion Funnel',
      text: 'Analyzing session data. Generating conversion funnel schema and abandonment metrics...',
      components: [
        { id: 'ec1', type: 'stat', title: 'Cart Abandonment', data: { value: '68.4%', label: 'Avg Rate', trend: -2.1 }, layout: 'col-span-12 md:col-span-4' },
        { id: 'ec2', type: 'chart', title: 'Funnel Drop-off', layout: 'col-span-12 md:col-span-8' },
        { id: 'ec3', type: 'dashboard', title: 'Revenue vs Conversion', layout: 'col-span-12' }
      ]
    };
  }

  if (lower.includes('security') || lower.includes('audit') || lower.includes('threat')) {
    return {
      type: 'composite',
      title: 'Security Posture & Threat Matrix',
      text: 'Compiling security index. Initializing threat map and vulnerability datagrid...',
      components: [
        { id: 'sa1', type: 'radar', title: 'Threat Index', layout: 'col-span-12 lg:col-span-4' },
        { id: 'sa2', type: 'map', title: 'Global Incident Origins', layout: 'col-span-12 lg:col-span-8' },
        { id: 'sa3', type: 'table', title: 'Active Vulnerabilities', layout: 'col-span-12' }
      ]
    };
  }

  if (lower.includes('architecture') || lower.includes('code') || lower.includes('technical') || lower.includes('infrastructure')) {
    return {
      type: 'composite',
      title: 'Technical Scaffolding & Infrastructure',
      text: 'Provisioning simulated infrastructure view and code core logic...',
      components: [
        { id: 't1', type: 'code', title: 'Compute Engine', language: 'TypeScript', layout: 'col-span-12 lg:col-span-8' },
        { id: 't2', type: 'radar', title: 'System Health', layout: 'col-span-12 lg:col-span-4' },
        { id: 't3', type: 'table', title: 'Microservices Fleet', layout: 'col-span-12' }
      ]
    }
  }

  if (lower.includes('sprint') || lower.includes('board') || lower.includes('task') || lower.includes('kanban')) {
    return { 
      type: 'composite', 
      title: 'Q4 Delivery Dashboard',
      components: [
        { id: 's1', type: 'stat', title: 'Velocity', data: { value: '84', label: 'Story Points', trend: 12 }, layout: 'col-span-12 sm:col-span-4' },
        { id: 's2', type: 'stat', title: 'Blockers', data: { value: '2', label: 'Critical Path', trend: -50 }, layout: 'col-span-12 sm:col-span-4' },
        { id: 's3', type: 'stat', title: 'Completion', data: { value: '62%', label: 'Sprint Progress', trend: 4.5 }, layout: 'col-span-12 sm:col-span-4' },
        { id: 's4', type: 'kanban', title: 'Active Board', layout: 'col-span-12' }
      ]
    };
  }
  
  if (lower.includes('user') || lower.includes('sign up') || lower.includes('table') || lower.includes('list') || lower.includes('everything about')) {
    return { 
      type: 'composite', 
      title: 'User Analytics & Directory',
      components: [
        { id: 'u1', type: 'stat', title: 'Total Sign Ups', data: { value: '45,920', label: 'All Time', trend: 8.4 }, layout: 'col-span-12 md:col-span-6 lg:col-span-3' },
        { id: 'u2', type: 'stat', title: 'Active Users', data: { value: '12,400', label: 'MAU', trend: 14.1 }, layout: 'col-span-12 md:col-span-6 lg:col-span-3' },
        { id: 'u3', type: 'chart', title: 'Sign Up Trend', layout: 'col-span-12 lg:col-span-6' },
        { id: 'u4', type: 'table', title: 'Recent Sign Ups', layout: 'col-span-12' }
      ]
    };
  }
  
  if (lower.includes('dash') || lower.includes('metric') || lower.includes('chart') || lower.includes('revenue') || lower.includes('adoption')) {
    return { 
      type: 'composite',
      title: 'Metrics & Performance',
      components: [
        { id: 'c1', type: 'dashboard', title: 'Platform Adoption & Revenue', layout: 'col-span-12 lg:col-span-8' },
        { id: 'c0', type: 'chart', title: 'QoQ Growth', layout: 'col-span-12 lg:col-span-4' },
        { id: 'c2', type: 'budget_variance', title: 'Financial Allocations', layout: 'col-span-12 lg:col-span-6' },
        { id: 'c3', type: 'stat', title: 'MRR', data: { value: '$124K', label: 'Monthly Recurring', trend: 18.2 }, layout: 'col-span-12 md:col-span-6 lg:col-span-3' },
        { id: 'c4', type: 'stat', title: 'Churn', data: { value: '1.2%', label: 'Revenue Churn', trend: -0.4 }, layout: 'col-span-12 md:col-span-6 lg:col-span-3' },
      ]
    };
  }
  
  if (lower.includes('hello') || lower.includes('hi')) {
     return { 
       type: 'composite', 
       title: 'GenOS Command Center',
       components: [
         { id: 'h1', type: 'text', title: "Hello! I am GenOS v1.4, an advanced Generative UI Agent.\n\nI compose my replies natively in functional UI blocks instead of static text. I act as an operating system generating specialized tools on demand.\n\nTry asking me to \"Manage the Q4 expansion\", \"Show the latest sprint tasks\", \"Generate a revenue dashboard\", or \"View technical infrastructure\".", layout: 'col-span-12' }
       ]
     };
  }

  // Generic fallback with a rich composite
  return { 
     type: 'composite', 
     title: `Dynamic Workspace: ${prompt.slice(0, 20)}...`,
     components: [
       { id: 'f1', type: 'dashboard', title: 'Overview', layout: 'col-span-12 lg:col-span-8' },
       { id: 'f2', type: 'stat', title: 'Confidence', data: { value: '94%', label: 'AI Synthesis', trend: 2 }, layout: 'col-span-12 lg:col-span-4' },
       { id: 'f3', type: 'table', title: 'Relevant Data Sets', layout: 'col-span-12' }
     ]
  };
}
