document.addEventListener('DOMContentLoaded', function () {
  const clearBtnLink = document.querySelector('.clearBtnLink');
  const birthdateBtnLink = document.querySelector('.birthdateBtnLink');
  const wrapper = document.querySelector('.wrapper');

  //form
  const form = document.getElementById('birthdate-form');

  //inputs
  const inputs = document.querySelectorAll('.input-box input');
  const day = document.getElementById('day');
  const month = document.getElementById('month');
  const year = document.getElementById('year');

  //for console
  const digits = [
    [' *** ', '*   *', '*   *', '*   *', ' *** '], // 0
    ['  *  ', ' **  ', '  *  ', '  *  ', ' *** '], // 1
    [' *** ', '*   *', '  ** ', ' *   ', '*****'], // 2
    [' *** ', '*   *', '  ** ', '*   *', ' *** '], // 3
    ['   * ', '  ** ', ' * * ', '*****', '   * '], // 4
    ['*****', '*    ', '**** ', '    *', '**** '], // 5
    [' *** ', '*    ', '**** ', '*   *', ' *** '], // 6
    ['*****', '    *', '   * ', '  *  ', '  *  '], // 7
    [' *** ', '*   *', ' *** ', '*   *', ' *** '], // 8
    [' *** ', '*   *', ' ****', '    *', ' *** '] // 9
  ];

  inputs.forEach(input => {
    input.addEventListener('input', function () {
      if (input.value) {
        input.classList.add('filled');
      } else {
        input.classList.remove('filled');
      }
    });
  });

  day.addEventListener('input', () => {
    day.style.borderColor = day.validity.valid ? '' : '#c75a5a';
  });

  month.addEventListener('input', () => {
    month.style.borderColor = month.validity.valid ? '' : '#c75a5a';
  });

  year.addEventListener('input', () => {
    year.style.borderColor = year.validity.valid ? '' : '#c75a5a';
  });

  birthdateBtnLink.addEventListener('click', function (event) {
    event.preventDefault();

    if (!day.validity.valid || !month.validity.valid || !year.validity.valid) {
      validateField();
      return;
    }
    getDiv();
    console.log(drawNumber(day.value));
    console.log(drawNumber(month.value));
    console.log(drawNumber(year.value));
    wrapper.classList.toggle('active');
  });

  clearBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
    inputs.forEach(input => input.classList.remove('filled'));
    form.reset();
  });

  function getDayOfWeek(day, month, year) {
    const date = new Date(year, month - 1, day);
    const daysOfWeek = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота'
    ];
    return daysOfWeek[date.getDay()]; // date.getDay() вернется число - это день и сопоставится с днем недели из массива daysOfWeek
  }

  function isLeapYear(year) {
    return (
      (year % 400 === 0 && year % 100 !== 0) ||
      (year % 4 === 0 && year % 100 !== 0)
    );
  }

  function getAge(day, month, year) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();

    // Если др еще не было в этом году
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  }

  function getDiv() {
    const dayOfWeek = getDayOfWeek(day.value, month.value, year.value);
    const leapYear = isLeapYear(year.value);
    const age = getAge(day.value, month.value, year.value);

    const birthdateDiv = document.getElementById('birthdate');
    birthdateDiv.innerText = `
    Вы родились: ${day.value}/${month.value}/${year.value}
    `;
    birthdateDiv.classList.add('show');

    const dayOfWeekDiv = document.getElementById('dayOfWeek');
    dayOfWeekDiv.innerText = `
    День недели: ${dayOfWeek}
    `;
    dayOfWeekDiv.classList.add('show');

    const leapYearDiv = document.getElementById('leapYear');
    leapYearDiv.innerText = `
    Високосный год: ${leapYear ? 'Да' : 'Нет'}
    `;
    leapYearDiv.classList.add('show');

    const fullAgeDiv = document.getElementById('fullAge');
    fullAgeDiv.innerText = `
    Возраст: ${age} ${getEndOfAge(age)}
    `;
    fullAgeDiv.classList.add('show');
  }

  function getEndOfAge(age) {
    ageToStr = age.toString();
    lastDigit = ageToStr.slice(-1);
    switch (lastDigit) {
      case '1':
        return 'год';
      case '2':
      case '3':
      case '4':
        return 'года';
      default:
        return 'лет';
    }
  }

  function validateField() {
    day.style.borderColor = day.validity.valid ? '' : '#c75a5a';
    month.style.borderColor = month.validity.valid ? '' : '#c75a5a';
    year.style.borderColor = year.validity.valid ? '' : '#c75a5a';
  }

  function drawDigit(digit) {
    return digits[digit].join('\n');
  }

  function drawNumber(number) {
    const digitToStr = number
      .toString()
      .split('')
      .map(digit => drawDigit(digit));
    const rows = Array.from({ length: 5 }, (_, rowIndex) =>
      digitToStr.map(digit => digit.split('\n')[rowIndex]).join('  ')
    );

    return rows.join('\n');
  }
});
