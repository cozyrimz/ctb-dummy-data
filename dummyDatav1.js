/*** GENERAL Requirements FOR REACT CODE ******/
/*
  1. Use functional reaction components, not class components
  2. Make re-usable react components where possible
  3. Use the contenxt api wherever possible to pass information to child components
  4. If possible use a styled component libary such as material-ui
  5. If possible using a library such as material-table for editable/filterable tables
  6. Graphing library can be your preferencs, some suggestions are d3 and highcharts
  7. If possible use SASS/SCSS instead of regular css
  8. Sample data is provided below, please simulate api calls but hard code data below as the response instead for front end for now
*/

/*------------------------------------------------------------------------------*/
/*** Source Data Summary Page ***/

// The 6 cards on this page will call the following api:

// Error -> display red x on card
// Issue -> display yellow excamantion mark on card
// Verified -> display green check mark on card

const importStatusAPIPath = `${process.env.api_url}/api/dataSource/v1/importStatus`; //GET Request
const importStatusResponse = {
  billOfMaterials: 'Verified',
  inventory: 'Issue',
  deliveries: null,
  forecast: 'Error',
  productionActuals: null,
  otherInformation: null,
};

/*------------------------------------------------------------------------------*/
/*** Scenario Planning Page ***/

/*Parent Part Number */
/// Dropdown for Parent part number will return an array of parts
//that you should be able to select as a parent part number.
// This will rerender the entire page as all of the metrics
// on the page will require a parent part number as an input.
// You may want to use the react context api to reference this for child components.
const parentPartAPIPath = `${process.env.api_url}/api/part/v1/parentParts`; //GET Request
const parentPartResponse = ['AA,BB,CC'];

/* summary boxes */
// Api to get data for the cards to the right of the parent part drop down
const summaryStatsAPIPath = `${process.env.api_url}/api/ctb/v1/summaryStats`; //POST Request
const summaryStatsRequestBody = {
  parentPart: 'AA',
};
const summaryStatsResponse = {
  ctbWithInventory: 34,
  ctbWithDelivery: 48,
  firstShortage: '06/20/2021',
  yearToDateBuild: 48,
  yearToDateBacklog: 10,
};

/* Production Forecast */
// this will be an array of objects response for the bar/line graph near the top of the page
// pass in the parent part as metioned above
const productionForecastAPIPath = `${process.env.api_url}/api/ctb/v1/productionForecast`; //POST Request
const productionForecastRequestBody = {
  parentPart: 'AA',
};
const productionForecastResponse = [
  { date: '2/5/2021', cumulativeTarget: 5, weeklyTarget: 5 },
  { date: '2/12/2021', cumulativeTarget: 5, weeklyTarget: 5 },
  { date: '2/19/2021', cumulativeTarget: 20, weeklyTarget: 10 },
  { date: '2/26/2021', cumulativeTarget: 20, weeklyTarget: 10 },
  { date: '3/5/2021', cumulativeTarget: 25, weeklyTarget: 15 },
  { date: '3/12/2021', cumulativeTarget: 30, weeklyTarget: 15 },
  { date: '3/19/2021', cumulativeTarget: 35, weeklyTarget: 20 },
  { date: '3/26/2021', cumulativeTarget: 40, weeklyTarget: 25 },
];

/* Clear to Build Table */

// This api will get the data for the main clear to build table
// you will pass in a parent part number selected from the drop down
// notice how the part number, description and part type will be before the dates in the column layout.

//the response body will provide a columns key to denote the order of columns and a data key to give you an array of objects with data in it with the keys being the column names

// the coloring of the cells will be as follows
// if we have a positive number -> gray number
// if we have 0 or a negative number -> red number
// if we have a delivery on that day which can be checked with the deliveries api mentioned below then color the background of the cell green.

const clearToBuildTableAPIPath = `${process.env.api_url}/api/ctb/v1/clearToBuildTable`; //POST Request
const clearToBuildTableRequestBody = {
  parentPart: 'AA',
  includeDeliveries: true,
  includeBacklog: false,
};
const clearToBuildTableResponse = {
  columns: [
    'pn',
    'desc',
    'partTypes',
    '2/5/2021',
    '2/12/2021',
    '2/19/2021',
    '2/26/2021',
    '3/5/2021',
    '3/12/2021',
    '3/19/2021',
    '3/26/2021',
  ],
  data: [
    {
      pn: 'AB',
      desc: 'Part Name',
      partType: 'Interior',
      '2/5/2021': 100,
      '2/12/2021': 50,
      '2/19/2021': -50,
      '2/26/2021': -100,
      '3/5/2021': 200,
      '3/12/2021': 150,
      '3/19/2021': 50,
      '3/26/2021': 0,
    },
    {
      pn: 'AC',
      desc: 'Part Name',
      partType: 'Interior',
      '2/5/2021': 70,
      '2/12/2021': -140,
      '2/19/2021': 100,
      '2/26/2021': 70,
      '3/5/2021': 50,
      '3/12/2021': 30,
      '3/19/2021': 20,
      '3/26/2021': -10,
    },
    {
      pn: 'AAB',
      desc: 'Part Name',
      partType: 'Interior',
      '2/5/2021': 50,
      '2/12/2021': 50,
      '2/19/2021': 50,
      '2/26/2021': -50,
      '3/5/2021': -50,
      '3/12/2021': -50,
      '3/19/2021': 50,
      '3/26/2021': 50,
    },
    {
      pn: 'AAC',
      desc: 'Part Name',
      partType: 'Interior',
      '2/5/2021': 12,
      '2/12/2021': 11,
      '2/19/2021': 11,
      '2/26/2021': -20,
      '3/5/2021': -10,
      '3/12/2021': 0,
      '3/19/2021': 10,
      '3/26/2021': 20,
    },
  ],
};

//Deliveries - Pass in a parent part number to this api
// to get an object of part keys corresponding to their delivery dates in an array
// this will be used in conjunction with the clear to build table api to node when a delivery of a part will come in to highlight it green
const partDeliverySummaryAPIPath = `${process.env.api_url}/api/delivery/v1/partDeliverySummary`; //POST Request
const partDeliverySummaryRequestBody = {
  parentPart: 'AA',
};
const partDeliverySummaryResponse = {
  AB: ['3/12/2021', '3/19/2021'],
  AC: ['2/5/2021', '3/5/2021'],
  AAB: ['2/12/2021', '3/26/2021'],
  AAC: ['2/19/2021', '3/26/2021'],
};

/* Recent and Upcoming Deliveries */

// this will be a table that is editable with  drop down under the status column on the very right
// the options for the drop down can be 'Delivered' or 'Pending' for now

// call the api with a parent part number and the limit of number of entries that is needed, int his case it is 5
const recentDeliveriesAPIPath = `${process.env.api_url}/api/delivery/v1/recentDeliveries`; //POST Request
const recentDeliveriesRequestBody = {
  parentPart: 'AA',
  limit: 5,
};
const recentDeliveriesResponse = [
  {
    id: 'bakdcic',
    partNumber: 'AB',
    supplier: 'Fork Co',
    deliveryDate: '3/26/2021',
    Qty: 10,
    trackingNumber: '1ZAF234U82934',
    status: 'Pending',
  },
  {
    id: 'lidkecc',
    partNumber: 'AC',
    supplier: 'Fork Co',
    deliveryDate: '3/19/2021',
    Qty: 20,
    trackingNumber: '1Z34KFJFIFKLD',
    status: 'Pending',
  },
  {
    id: 'wefidkc',
    partNumber: 'AAC',
    supplier: 'Fork Co',
    deliveryDate: '3/19/2021',
    Qty: 40,
    trackingNumber: '1ZLJEIJIIIIIJ',
    status: 'Delivered',
  },
  {
    id: 'zvmvneii',
    partNumber: 'AAC',
    supplier: 'Fork Co',
    deliveryDate: '3/12/2021',
    Qty: 10,
    trackingNumber: '1Z35857830295',
    status: 'Pending',
  },
  {
    id: 'irure8jf',
    partNumber: 'AAB',
    supplier: 'Fork Co',
    deliveryDate: '3/5/2021',
    Qty: 20,
    trackingNumber: '1Z9338889FF99',
    status: 'Delivered',
  },
  {
    id: 'fklafe9f',
    partNumber: 'AAC',
    supplier: 'Fork Co',
    deliveryDate: '2/26/2021',
    Qty: 100,
    trackingNumber: '1Z938FJ8389F0',
    status: 'Pending',
  },
];

// this is the api to call to update a delivery row which includes status update and updating any of the fields below
const updateDeliveryItemAPIPath = `${process.env.api_url}/api/delivery/v1/:itemId/update`; //PUT Request
const updateDeliveryItemBody = {
  partId: 'bakdcic',
  estimatedDeliveryDate: '2021-02-21T05:57:18Z',
  deliveryDesc: 'new description',
  trackingNumber: '1ZSOMENEWtrackingNUmber',
  estimatedQty: 10,
  status: 'Delivered',
  vendorName: 'New Vendor Name',
  purchaseOrderNumber: 'newPONumber',
};
// response status code will be 20x if good or 50x if error

const deleteDeliveryItemAPIPath = `${process.env.api_url}/api/delivery/v1/:itemId/delete`; // DELETE Request

// response status code will be 20x

/*------------------------------------------------------------------------------*/

/**** Source Data -> Deliveries Page ****/

/* select data source/ upload */
//POST request with body as 'form-data' and will be parsed as form data by the back end
const uploadAPIPath = `${process.env.api_url}/api/dataSource/v1/uploadFile`;
const formData = {
  uploadFile: '<attachment of excel/csv file>',
  fileType: 'Excel/CSV',
  dataType: 'deliveries',
};
// response will be  200 if file was recieved proprely, use upload summary befor to get columns

/* upload summary for file*/
const deliveriesUploadSummaryAPIPath = `${process.env.api_url}/api/dataSource/v1/deliverySummary`;
const deliveriesUploadSummaryResponse = {
  content: 'deliveries',
  fileId: 'alkjfei2bid',
  lastUpdated: '2021-02-21T05:57:18Z',
  lastUpdatedFileName: 'last-updated-file.xlsx',
  columnsInSheet: ['PN', 'eta', 'Status', 'etc'],
  columnRef: {
    partNumber: null,
    estimatedDeliveryDate: null,
    status: null,
    estimatedQty: null,
    deliveryDesc: null,
    partType: null,
    vendorName: null,
    purchaseOrderNumber: null,
    trackingNumber: null,
    otherCategories: [],
  },
};

// columnMapping key will be empty till user selects it.

const deliveryColumnMapAPIPath = `${process.env.api_url}/api/dataSource/v1/deliveryColumnMap`;
const deliveryColumnMapRequestBody = {
  fileId: 'aiwefjkd', //this is taken from the upload summary above
  columnRef: {
    partNumber: 'PN',
    estimatedDeliveryDate: 'eta',
    status: 'Status',
    estimatedQty: 'estimated_quantity',
    deliveryDesc: 'Description',
    partType: 'Category',
    vendorName: 'vendor_name',
    purchaseOrderNumber: 'pohdr_po_number',
    trackingNumber: 'trackingNumber',
    otherCategories: ['notes'], //if theres any other categories they want to import pass the column names as an array
  },
  cleanImport: true, // this indicates if we should import the file and erase deliery data, otherwise this will just add to existing delviery data
};

// 200 response will indicate no errors. Can refresh upload summary above to verify column mappings

/* Recent and Upcoming Deliveries */
// exact same path, body, and response as above but parentPart is not needed as an
// in put into the body
