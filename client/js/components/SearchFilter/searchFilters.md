Data source from SearchResults(searchResults.results)

Filters:

1.  First Name
    sort alphabetically by value('firstName')
    Array.sort(function (a, b) {
    var firstNameA = a.firstName.toLowerCase(), firstNameB = b.firstName.toLowerCase();
    if (firstNameA < firstNameB) return -1;
    if (firstNameA > firstNameB) return 1;
    return 0;
    });
2.  ProfileScore(Best Profile)
    sort in descending order by value('profileScore')
    Array.sort(function (a, b) {
    return a.profileScore - b.profileScore;
    });
3.  GraduationDate
    Array.sort(function (a, b) {
    var dateA = new Date(a.graduationDate), dateB = new Date(b.graduationDate);
    return dateA - dateB;
    });
    -----1-3 may use the same function
    function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
    }
    return function (a, b) {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result \* sortOrder;
    }
    }
    Array.sort(dynamicSort('firstName'));
    Array.sort(dynamicSort('profileScore'));
    Array.sort(dynamicSort('graduationDate'));

4)  School Name
    filter by value('schoolName')
    var result = jsObjects.filter(function (obj) { return obj.schoolName == 'Origin Code Academy'; });
    or:
    function getByValue(arr, value) {
    var result = arr.filter(function (o) { return o.b == value; });
    return result ? Result[0] : null;
5)  Location
    find by value('location.city') Array.find() or Array.filter() method should be used.
    var result = jsObjects.filter(function (obj) { return obj.location.city == 'San Diego'; });
6)  Position Type
    find by value('positionType')
    var result = jsObjects.filter(function (obj) { return obj.positionType == 'fullTime'; });
