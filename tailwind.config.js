module.exports = {
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: theme => ({
      ...theme('colors'),
      'calculator': '#e3b27b',

    }),
    borderColor: theme => ({
      ...theme('colors'),
      'calculator': '#e3b27b',
    }),
    textColor: theme => ({
      ...theme('colors'),
      'calculator': '#e3b27b',
    }),

  },
  variants: {
    extend: {backgroundColor: ['active'],},
    backgroundOpacity: ['active'],
  },
  plugins: [],
}