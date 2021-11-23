import cihLogo from 'images/Cih-bank.png';
import faceToFaceLogo from 'images/face-to-face.jpeg';
import paypalLogo from 'images/paypalLogo.jpeg';
import wuLogo from 'images/wuLogo.png';
/* eslint-disable no-nested-ternary */


export const displayDate = (timestamp) => {
  const date = new Date(timestamp);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // return day + ' ' + monthNames[monthIndex] + ' ' + year;
  return `${monthNames[monthIndex]} ${day}, ${year}`;
};

export const currentCurrency = (country) => {
  switch (country) {
    case 'Morocco':
      return 'MAD';
    case 'United States':
      return '$';
    case 'France':
      return '€';
    default:
      return 'MAD';
  }
}

export const displayMoney = (n) => {
  const format = new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD'
  });

  // or use toLocaleString()
  return format.format(n);
};

export const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;

  const total = arr.reduce((acc, val) => acc + val, 0);

  return total.toFixed(2);
};

export const displayActionMessage = (msg, status = 'info') => {
  const div = document.createElement('div');
  const span = document.createElement('span');

  div.className = `toast ${status === 'info'
    ? 'toast-info'
    : status === 'success'
      ? 'toast-success'
      : 'toast-error'
    // eslint-disable-next-line indent
    }`;
  span.className = 'toast-msg';
  span.textContent = msg;
  div.appendChild(span);


  if (document.querySelector('.toast')) {
    document.body.removeChild(document.querySelector('.toast'));
    document.body.appendChild(div);
  } else {
    document.body.appendChild(div);
  }

  setTimeout(() => {
    try {
      document.body.removeChild(div);
    } catch (e) {
      console.log(e);
    }
  }, 3000);
};

export const paymentLogo = (payment) => {
    switch (payment) {
    case 'CIH':
      return cihLogo;
    case 'PayPal':
      return paypalLogo;
    case 'Western Union':
      return wuLogo;
    case 'Face-To-Face':
      return faceToFaceLogo;
    default:
      return faceToFaceLogo;
  }
}

export const payments = [
  { value: 'CIH', label: 'CIH' },
  { value: 'Face-To-Face', label: 'Face-To-Face' },
  { value: 'PayPal', label: 'PayPal' },
  { value: 'Western Union', label: 'Western Union' }
];

export const brandOptions = [
  { value: 'Gaming', label: 'Gaming' }
];

export const game = [
  { value: 'Dofus', label: 'Dofus' }
  //{ value: 'Dofus Touch', label: 'Dofus Touch' },
];

export const gameAsset = [
  { value: 'kamas', label: 'Kamas' },
  { value: 'item', label: 'Item' },
  { value: 'account', label: 'Account' }
];
export const community = [
  { value: 'All', label: 'All' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'Spanish', label: 'Espagnole' },
  { value: 'French', label: 'French' },
  { value: 'International', label: 'International' },
  { value: 'Retro 1.30', label: 'Retro 1.30' }
];

export const brazilServers = [
  { value: 'All', label: 'All' },
  { value: 'Crocabulia', label: 'Crocabulia' }
];

export const retroServers = [
  { value: 'All', label: 'All' },
  { value: 'Boune', label: 'Boune' },
  { value: 'Crail', label: 'Crail' },
  { value: 'Eratz', label: 'Eratz' },
  { value: 'Galgarion', label: 'Galgarion' },
  { value: 'Henual', label: 'Henual' }
];

export const frenchServers = [
  { value: 'All', label: 'All' },
  { value: 'Agride', label: 'Agride' },
  { value: 'Brumen', label: 'Brumen' },
  { value: 'Furye', label: 'Furye' },
  { value: 'Julith', label: 'Julith' },
  { value: 'Meriana', label: 'Meriana' },
  { value: 'Merkator', label: 'Merkator' },
  { value: 'Nidas', label: 'Nidas' },
  { value: 'Pandore', label: 'Pandore' },
  { value: 'Ush', label: 'Ush' }
];

export const spanishServers = [
  { value: 'All', label: 'All' },
  { value: 'Atcham', label: 'Atcham' },
  { value: 'Rubilax', label: 'Rubilax' }
];

export const internationalServers = [
  { value: 'All', label: 'All' },
  { value: 'Dagob', label: 'Dagob' },
  { value: 'Domo', label: 'Domo' },
  { value: 'Echo', label: 'Echo' },
  { value: 'Hoskar', label: 'Hoskar' },
  { value: 'Hulhu', label: 'Hulhu' },
  { value: 'Ilyzaelle', label: 'Ilyzaelle' },
  { value: 'Jahash', label: 'Jahash' },
  { value: 'Muta', label: 'Muta' },
  { value: 'Ombre', label: 'Ombre' },
  { value: 'Oto Mustam', label: 'Oto Mustam' },
  { value: 'Pikmi', label: 'Pikmi' },
  { value: 'Sak', label: 'Sak' },
  { value: 'Ultram', label: 'Ultram' }
];

