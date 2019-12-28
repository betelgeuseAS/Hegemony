import LocalizedStrings from 'react-localization';

let localization = new LocalizedStrings({
  en:{
    //language
    language: "English",
    //date:
    date: {
      months_long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      months_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      weekdays_long: ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekdays_short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekdays_min: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      moment: {
        longDateFormat: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "MM/DD/YYYY",
          l: "M/D/YYYY",
          LL: "MMMM Do YYYY",
          ll: "MMM D YYYY",
          LLL: "MMMM Do YYYY LT",
          lll: "MMM D YYYY LT",
          LLLL: "dddd, MMMM Do YYYY LT",
          llll: "ddd, MMM D YYYY LT"
        },
        calendar : {
          lastDay : '[Yesterday at] LT',
          sameDay : '[Today at] LT',
          nextDay : '[Tomorrow at] LT',
          lastWeek : '[last] dddd [at] LT',
          nextWeek : 'dddd [at] LT',
          sameElse : 'L'
        },
        relativeTime : {
          future: "in %s",
          past:   "%s ago",
          s  : 'a few seconds',
          ss : '%d seconds',
          m:  "a minute",
          mm: "%d minutes",
          h:  "an hour",
          hh: "%d hours",
          d:  "a day",
          dd: "%d days",
          M:  "a month",
          MM: "%d months",
          y:  "a year",
          yy: "%d years"
        },
        am: 'AM',
        pm: 'PM'
      }
    },
    you_have_chosen: 'You have chosen',
    choose_date: 'Please choose date',
    //auth:
    sign_in: "Sign in",
    sign_up: "Sign up",
    login: "Login",
    logout: "Logout",
    not_auth: "Not authorized",
    server_error: "Server error",
    user_not_found: "User not found",
    email_invalid: "Email is invalid",
    email_required: "Email is required",
    email_exists: "Email already exists",
    incorrect_password: "Incorrect Password",
    password_must_have_chars: "Password must have 4 chars",
    password_required: "Password is required",
    first_name_required: "First name field is required",
    first_name_must_between_chars: "First name must be between 2 to 30 chars",
    last_name_required: "Last name field is required",
    last_name_must_between_chars: "Last name must be between 2 to 30 chars",
    //alerts:
    success: "Success",
    warning: "Warning",
    error: "Error",
    //nav bar:
    diary: "Diary",
    plans: "Plans",
    reminder: "Reminder",
    note: "Note",
    learn: "Learn",
    settings: "Settings",
    //diary:
    title_required: "Title field is required",
    content_required: "Content field is required",
    search_records: "Search records",
    enter_record_name: "Enter record name",
    enter_title: "Enter title",
    nothing_was_found: "Nothing was found",
    you_can_see_results: "You can see results",
    what_your_mind: "What is your mind?",
    not_forgotten_anything: "You have not forgotten anything?",
    //...
    create: "Create",
    delete: "Delete",
    update: "Update",
    save: "Save",
    loading: "Loading",
    title: 'Title',
    date_creation: "Date of creation",
    created: "Created",
    last_edit: "Last edit",
    back: "Back"
  },
  uk: {
    //language
    language: "Українська",
    //date:
    date: {
      months_long: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
      months_short: ['Cіч', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд'],
      weekdays_long: ['Неділя','Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П`ятниця', 'Субота'],
      weekdays_short: ['Нед', 'Пон', 'Вів', 'Сер', 'Чет', 'П`ят', 'Суб'],
      weekdays_min: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      moment: {
        longDateFormat: {
          LT: "г:хх A",
          LTS: "г:хх:сс A",
          L: "ММ/ДД/РРРР",
          l: "М/Д/РРРР",
          LL: "ММММ Do РРРР",
          ll: "МММ D РРРР",
          LLL: "ММММ Do РРРР LT",
          lll: "МММ D РРРР LT",
          LLLL: "дддд, ММММ Do РРРР LT",
          llll: "ддд, МММ D РРРР LT"
        },
        calendar : {
          lastDay : '[Вчора о] LT',
          sameDay : '[Сьогодні о] LT',
          nextDay : '[Завтра о] LT',
          lastWeek : '[останнім] dddd [у] LT',
          nextWeek : 'dddd [у] LT',
          sameElse : 'L'
        },
        relativeTime : {
          future: "в %s",
          past:   "%s тому",
          s  : 'кілька секунд',
          ss : '%d секунд',
          m:  "хвилина",
          mm: "%d хвилин",
          h:  "година",
          hh: "%d годин",
          d:  "день",
          dd: "%d днів",
          M:  "місяць",
          MM: "%d місяців",
          y:  "рік",
          yy: "%d років"
        },
        am: '',
        pm: ''
      }
    },
    you_have_chosen: 'Ви обрали',
    choose_date: 'Будь ласка, оберіть дату',
    //auth:
    sign_in: "Увійти",
    sign_up: "Зареєструватися",
    login: "Авторизуватися",
    logout: "Вийти",
    not_auth: "Не авторизовано",
    server_error: "Помилка сервера",
    user_not_found: "Користувача не знайдено",
    email_invalid: "Електронна адреса недійсна",
    email_required: "Електронна адреса обов'язкова",
    email_exists: "Електронна адреса вже існує",
    incorrect_password: "Невірний пароль",
    password_must_have_chars: "Пароль повинен містити 4 символи",
    password_required: "Пароль обов'язковий",
    first_name_required: "Ім'я обов'язкове",
    first_name_must_between_chars: "Ім'я має становити від 2 до 30 символів",
    last_name_required: "Прізвище обов'язкове",
    last_name_must_between_chars: "Прізвище має становити від 2 до 30 символів",
    //alerts:
    success: "Успіх",
    warning: "Попередження",
    error: "Помилка",
    //nav bar:
    diary: "Щоденник",
    plans: "Плани",
    reminder: "Нагадування",
    note: "Примітки",
    learn: "Вивчення",
    settings: "Налаштування",
    //diary:
    title_required: "Заголовок обов'язковий",
    content_required: "Контент обов'язковий",
    search_records: "Пошук записів",
    enter_record_name: "Введіть ім'я запису",
    enter_title: "Введіть заголовок",
    nothing_was_found: "Нічого не знайдено",
    you_can_see_results: "Ви можете побачити результати",
    what_your_mind: "Що у вас на думці?",
    not_forgotten_anything: "Нічого не забули?",
    //...
    create: "Створити",
    delete: "Видалити",
    update: "Оновити",
    save: "Зберегти",
    loading: "Завантаження",
    title: 'Заголовок',
    date_creation: "Дата створення",
    created: "Створено",
    last_edit: "Останнє редагування",
    back: "Назад"
  },
  ru: {
    //language
    language: "Русский",
    //date:
    date: {
      months_long: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      months_short: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      weekdays_long: ['Воскресенье','Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      weekdays_short: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
      weekdays_min: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      moment: {
        longDateFormat: {
          LT: "ч:мм A",
          LTS: "ч:мм:сс A",
          L: "ММ/ДД/ГГГГ",
          l: "М/Д/ГГГГ",
          LL: "ММММ Do ГГГГ",
          ll: "МММ D ГГГГ",
          LLL: "ММММ Do ГГГГ LT",
          lll: "МММ D ГГГГ LT",
          LLLL: "дддд, ММММ Do ГГГГ LT",
          llll: "ддд, МММ D ГГГГ LT"
        },
        calendar : {
          lastDay : '[Вчера в] LT',
          sameDay : '[Сегодня в] LT',
          nextDay : '[Завтра в] LT',
          lastWeek : '[последний] dddd [в] LT',
          nextWeek : 'dddd [в] LT',
          sameElse : 'L'
        },
        relativeTime : {
          future: "в %s",
          past:   "%s тому назад",
          s  : 'несколько секунд',
          ss : '%d секунд',
          m:  "минута",
          mm: "%d минут",
          h:  "an час",
          hh: "%d часов",
          d:  "день",
          dd: "%d дней",
          M:  "месяц",
          MM: "%d месяцы",
          y:  "год",
          yy: "%d лет"
        },
        am: '',
        pm: ''
      }
    },
    you_have_chosen: 'Вы выбрали',
    choose_date: 'Пожалуйста, выберите дату',
    //auth:
    sign_in: "Войти",
    sign_up: "Зарегистрироваться",
    login: "Авторизоваться",
    logout: "Выйти",
    not_auth: "Не авторизовано",
    server_error: "Ошибка сервера",
    user_not_found: "Пользователь не найден",
    email_invalid: "Электронная почта недействительна",
    email_required: "Электронная почта обязательна",
    email_exists: "Электронная почта уже существует",
    incorrect_password: "Неверный пароль",
    password_must_have_chars: "Пароль должен содержать 4 символа",
    password_required: "Пароль обязателен",
    first_name_required: "Имя обязательно",
    first_name_must_between_chars: "Имя должно быть от 2 до 30 символов",
    last_name_required: "Фамилия обязательно",
    last_name_must_between_chars: "Фамилия должна быть от 2 до 30 символов",
    //alerts:
    success: "Успех",
    warning: "Предупреждение",
    error: "Ошибка",
    //nav bar:
    diary: "Дневник",
    plans: "Планы",
    reminder: "Напоминание",
    note: "Примечания",
    learn: "Учить",
    settings: "Настройки",
    //diary:
    title_required: "Заголовок обязателен",
    content_required: "Контент обязателен",
    search_records: "Поиск записей",
    enter_record_name: "Введите имя записи",
    enter_title: "Введите заглавие",
    nothing_was_found: "Ничего не было найдено",
    you_can_see_results: "Вы можете увидеть результаты",
    what_your_mind: "Что у вас на уме?",
    not_forgotten_anything: "Ничего не забыли?",
    //...
    create: "Создать",
    delete: "Удалить",
    update: "Обновить",
    save: "Сохранить",
    loading: "Загрузка",
    title: "Заглавие",
    date_creation: "Дата создания",
    created: "Создано",
    last_edit: "Последнее редактирование",
    back: "Назад"
  }
});

export default localization;
