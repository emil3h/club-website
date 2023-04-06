let express = require('express');
let router = express.Router();
const { csClass } = require('../csClass');
const { csClasses } = require('../classes');

// GET CS class scheduling page.
router.get('/', (req, res) => {
    let classSearchNames = [];
    /**
     * filter through csClasses to find unique classes to list as an entry in drop down list
     */
    let catalogNumber = 0;
    for (let i = 0; i < csClasses.length; i++) {
        let currentClass = csClasses[i];

        if (currentClass.getCatalogNumber == catalogNumber) {
            continue;
        }
        /**
         * the current class is a unique class and append it to classSearchNames to send to html drop down list
         */
        else {
            classSearchNames.push(`CS ${currentClass.getCatalogNumber} - ${currentClass.getName}`);
            catalogNumber = currentClass.getCatalogNumber;
        }
    }
    res.render('scheduling', {
        csClasses: JSON.stringify(csClasses),
        classSearchNames: JSON.stringify(classSearchNames)
    });
})

module.exports = router;