import * as Data from './data';

const infobtn = document.getElementById('send-button');
infobtn.addEventListener('click', Data.getCityName);

const tempunits = document.getElementById('temp-units');
tempunits.addEventListener('change', Data.getCityName);