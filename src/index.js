import * as Data from './data';
import css from './styles.css';

const header = document.getElementsByTagName('head')[0];
const styleSheet = document.createElement('link');

styleSheet.rel = 'stylesheet';
styleSheet.type = 'text/css';
styleSheet.href = css;

header.appendChild(styleSheet);

const infobtn = document.getElementById('send-button');
infobtn.addEventListener('click', Data.getCityName);

const tempunits = document.getElementById('temp-units');
tempunits.addEventListener('change', Data.getCityName);