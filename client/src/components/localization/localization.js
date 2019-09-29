import LocalizedStrings from 'react-localization';

let localization = new LocalizedStrings({
  en:{
    //language
    language: "English",
    //date:
    date: {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weekdays_long: ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekdays_short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
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
      months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
      weekdays_long: ['Неділя','Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П`ятниця', 'Субота'],
      weekdays_short: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
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
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      weekdays_long: ['Воскресенье','Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      weekdays_short: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
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