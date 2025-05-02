export const availableWidgets = {
  cnapp: [
    { id: 'cnapp-overview', title: 'CNAPP Overview', type: 'text', content: 'CNAPP Overview Content' },
    { id: 'cnapp-alerts', title: 'CNAPP Alerts', type: 'text', content: 'CNAPP Alerts Content' },
    { id: 'cnapp-compliance', title: 'Compliance Status', type: 'text', content: 'Compliance Status Content' }
  ],
  cspm: [
    { id: 'cloud-accounts', title: 'Cloud Accounts', type: 'donut-chart', data: {
      total: 2,
      connected: 1,
      notConnected: 1
    }},
    { id: 'cloud-account-risk', title: 'Cloud Account Risk Assessment', type: 'donut-chart', data: {
      total: 9659,
      failed: 1689,
      warning: 581,
      notAvailable: 36,
      passed: 7353
    }},
    { id: 'cloud-resources', title: 'Cloud Resources', type: 'text', content: 'Cloud Resources Content' }
  ],
  cwpp: [
    { id: 'namespace-alerts', title: 'Top 5 Namespace Specific Alerts', type: 'empty-chart', data: {
      message: 'No Graph data available!'
    }},
    { id: 'workload-alerts', title: 'Workload Alerts', type: 'empty-chart', data: {
      message: 'No Graph data available!'
    }},
    { id: 'container-security', title: 'Container Security', type: 'text', content: 'Container Security Content' }
  ],
  registry: [
    { id: 'image-risk', title: 'Image Risk Assessment', type: 'progress-bar', data: {
      total: 1470,
      title: 'Total Vulnerabilities',
      items: [
        { label: 'Critical', value: 9, color: '#EF4444' },
        { label: 'High', value: 150, color: '#F59E0B' },
        { label: 'Medium', value: 600, color: '#FBBF24' },
        { label: 'Low', value: 711, color: '#34D399' }
      ]
    }},
    { id: 'image-security', title: 'Image Security Issues', type: 'progress-bar', data: {
      total: 2,
      title: 'Total Images',
      items: [
        { label: 'Critical', value: 2, color: '#EF4444' },
        { label: 'High', value: 2, color: '#F59E0B' }
      ]
    }},
    { id: 'registry-stats', title: 'Registry Statistics', type: 'text', content: 'Registry Statistics Content' }
  ]
};

export const initialData = {
  categories: [
    {
      id: "cnapp",
      title: "CNAPP Dashboard",
      widgets: []
    },
    {
      id: "cspm",
      title: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "cloud-accounts",
          title: "Cloud Accounts",
          type: "donut-chart",
          data: {
            total: 2,
            connected: 1,
            notConnected: 1
          }
        },
        {
          id: "cloud-account-risk",
          title: "Cloud Account Risk Assessment",
          type: "donut-chart",
          data: {
            total: 9659,
            failed: 1689,
            warning: 581,
            notAvailable: 36,
            passed: 7353
          }
        }
      ]
    },
    {
      id: "cwpp",
      title: "CWPP Dashboard",
      widgets: [
        {
          id: "namespace-alerts",
          title: "Top 5 Namespace Specific Alerts",
          type: "empty-chart",
          data: {
            message: "No Graph data available!"
          }
        },
        {
          id: "workload-alerts",
          title: "Workload Alerts",
          type: "empty-chart",
          data: {
            message: "No Graph data available!"
          }
        }
      ]
    },
    {
      id: "registry",
      title: "Registry Scan",
      widgets: [
        {
          id: "image-risk",
          title: "Image Risk Assessment",
          type: "progress-bar",
          data: {
            total: 1470,
            title: "Total Vulnerabilities",
            items: [
              { label: "Critical", value: 9, color: "#EF4444" },
              { label: "High", value: 150, color: "#F59E0B" },
              { label: "Medium", value: 600, color: "#FBBF24" },
              { label: "Low", value: 711, color: "#34D399" }
            ]
          }
        },
        {
          id: "image-security",
          title: "Image Security Issues",
          type: "progress-bar",
          data: {
            total: 2,
            title: "Total Images",
            items: [
              { label: "Critical", value: 2, color: "#EF4444" },
              { label: "High", value: 2, color: "#F59E0B" }
            ]
          }
        }
      ]
    }
  ]
};