const d = new Date();
const month = d.getMonth();

// Create a seasonal menu based on the current month
let season = "";
switch (month) {
    case 0:
    case 1:
    case 2:
        season = "Winter";
        break;

    case 3:
    case 4:
        season = "Spring";
        break;
    case 8:
    case 9:
        season = "Fall";
        break;
    case 10:
    case 11:
        season = "Holiday";
        break;
    default:
        season = "Summer";
        break;
}

export default season;
