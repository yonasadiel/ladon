var APPS_NAME = 'Ladon Sample App'
var SPREADSHEET_ID = '13IhhLyvUSdw18mXkwYHt1MdTaflqxXQ7CgDP3zdY0hc'
var FAVICON_URL = 'https://images.vexels.com/media/users/3/142408/isolated/preview/910ae724dc878524d143cf91fff7fddf-sans-serif-l-font-by-vexels.png'
var COLOR_PRIMARY = '#ffe0e2'
var COLOR_PRIMARY_DARK = '#f5c2c5'
var COLOR_ACCENT = '#9c5b95'
var PRIMARY_COLUMN = ['Name', 'City', 'Email']

/**
 * Define the schema below
 * Schema Object
 *   "sheetName" : sheet name correspond to spreadsheet
 *   "sections" : array of Section object
 * Section Object
 *   "sectionName" : name of the section
 *   "fields" : array of Field object
 * Field Object
 *   "id" : unique id for every field
 *   "name" : equivalence with column header in spreadsheet
 *   "type" : type of field, depend on the type, you may have (optional) additional properties:
 *            - createTimestamp : automatic set to time when user is registered
 *            - text : simple text
 *              - validate : regex for validation
 *              - error : error message if validation fails
 *            - autocomplete : simple autocomplete field
 *              - validate : regex for validation
 *              - error : error message if validation fails
 *            - number : simple number
 *              - minimum : lower bound input
 *              - maximum : upper bound input
 *              - validate : regex for validation, if interpreted as string
 *              - error : error message if validation fails
 *            - email : simple email
 *              - validate : regex for validation, if interpreted as string. recomended using /.+@.+\..+/
 *              - error : error message if validation fails
 *            - date : date, month, and year
 *              - validate : regex for validation
 *              - error : error message if validation fails
 *            - radio : radio button
 *              - options : options of radio
 *              - validate : regex for validation
 *              - error : error message if validation fails
 *            - checkbox : checkbox
 *              - options : options of checkbox
 *              - minimum : minimum chosen
 *              - maximum : maximum chosen
 *              - error : error message if validation fails
 *            - paragraph : not an input, just a text to be shown
 *              - text : text to show as paragraph
 *              - title : header of the paragraph
 *   "scope" : one of these:
 *             - hidden : never shown to any user (wont't accept input)
 *             - private : shown only to corresponding user
 *             - public : shown to all registered user
 *   "helper" : helper text, disabled on createTimestamp, updateTimestamp, and activeEmail
 */

var SCHEMA = {
  sheetName : 'Basic Fields',
  sections : [
    {
      sectionName : 'Introduction',
      fields: [
        {
          id: 'intro1',
          type: 'paragraph',
          title: '',
          text: 'This is sample form made for Ladon'
        }, {
          id: 'intro2',
          type: 'paragraph',
          title: 'Usage',
          text: 'You can customize config.gs in your project file'
        }, {
          id: 'intro3',
          type: 'paragraph',
          text: 'You can add text too. Feel free to add <strong> html element </strong> to <em> decorate </em> your text'
        }
      ]
    },{
      sectionName : 'Basic Info',
      fields: [
        {
          id: 'desc1',
          type: 'paragraph',
          title: 'Example',
          text: 'You can fill these form below. You don\'t have to use your actual credential, just explore all form fields available'
        }, {
          id: 'createdAt',
          name: 'Created At',
          type: 'createTimestamp',
          scope: 'hidden'
        }, {
          id: 'name',
          name: 'Name',
          type: 'text',
          helper: 'try left it 1 character only',
          validate: /^.{2,40}$/,
          error: 'Name should have 2 to 40 characters',
          placeholder: 'Your full name',
          scope: 'public'
        }, {
          id: 'email',
          name: 'Email',
          type: 'email',
          scope: 'public',
          validate: /.+@.+\..+/,
          error: 'Your email is not valid'
        }, {
          id: 'gender',
          name: 'Gender',
          type: 'radio',
          scope: 'public',
          validate: /Male|Female/,
          error: 'Please choose your gender',
          options: [ 'Male', 'Female' ]
        }, {
          id: 'birthDate',
          name: 'Birth Date',
          type: 'date',
          validate: /^.+$/, /* this is default regex for "cant be empty" field */
          error: 'This field is required',
          scope: 'private',
          minimum: [1995,0,1],
          maximum: [2002,12,31]
        }, {
          id: 'phoneNumber',
          name: 'Phone Number',
          type: 'number',
          helper: 'Your phone number won\'t be shared to others',
          validate: /^.{10,14}$/,
          error: '10 to 14 digit',
          scope: 'private'
        }, {
          id: 'city',
          name: 'City',
          type: 'autocomplete',
          helper: 'Try type \'c\' and autocomplete will help you',
          validate: /^.+$/,
          scope: 'private',
          placeholder: 'Born city',
          options: [ 'California', 'Los Angeles', 'Cichago' ]
        }
      ]
    },{
      sectionName : 'Feedback',
      fields: [
        {
          id: 'feature',
          name: 'What feature do you need?',
          type: 'checkbox',
          helper: 'Try left it blank',
          scope: 'public',
          options: [ 'Slider', 'Text Area', 'Select' ],
          minimum: 1,
          error: 'Minimum selection is 1'
        }
      ]
    }
  ]
}