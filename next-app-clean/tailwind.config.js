module.exports = {
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        'page-bg': 'var(--page-bg)',
        'panel-bg': 'var(--panel-bg)',
        'border-token': 'var(--border)',
        'muted': 'var(--muted)',
        'muted-2': 'var(--muted-2)',
        'text-token': 'var(--text)',
        'accent-token': 'var(--accent)',
      },
      backgroundColor: {
        'page': 'var(--page-bg)',
        'panel': 'var(--panel-bg)',
      },
      borderColor: {
        'token': 'var(--border)',
      },
      textColor: {
        'muted': 'var(--muted)',
        'muted-2': 'var(--muted-2)',
        'token': 'var(--text)',
      },
      maxWidth: {
        'content': '42ch',
        'content-wide': '56ch',
      },
    },
  },
} 