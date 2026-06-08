/* === Tours catalog (T1-T13) ===
 * Inlined so no fetch needed. Each tour: id, name, screens, steps.
 * Step count is computed from steps.length.
 *
 * All user-facing strings are bilingual: { en: "...", uk: "..." }.
 * Locale is picked by tour-overlay.js based on window.DEMO_VARIANT.
 */
window.DEMO_TOURS = {
  T1: {
    id: "T1",
    name: {
      en: "Dashboard: overview + theme + locale",
      uk: "Дашборд: огляд + тема + мова"
    },
    screen: "dashboard",
    available: true,
    steps: [
      {
        title: {
          en: "Welcome to your platform",
          uk: "Ласкаво просимо до вашої платформи"
        },
        body: {
          en: "Your work splits into 4 flows: launch products, order from suppliers, ship batches to FBA, outsource services. Everything you need to act on lives right here on the Dashboard.\n\n3 minutes to set you up.",
          uk: "Ваша робота складається з 4 напрямків: запуск товарів, замовлення у постачальників, відправлення партій на FBA, послуги фахівців. Усе, що потребує вашої уваги, зібрано тут — на Дашборді.\n\n3 хвилини, щоб усе налаштувати."
        },
        target: null
      },
      {
        title: {
          en: "Balance widget + Deposit / Withdraw",
          uk: "Віджет балансу + Поповнити / Вивести"
        },
        body: {
          en: "Your wallet at a glance. Available — spend now. Frozen — committed to open operations.\n\nTwo buttons: Deposit opens the deposit modal, Withdraw opens the withdraw modal.",
          uk: "Ваш гаманець з першого погляду. Доступно — можна витрачати зараз. Заморожено — зарезервовано під відкриті операції.\n\nДві кнопки: Поповнити відкриває вікно поповнення, Вивести — вікно виведення коштів."
        },
        target: ".css-2njluh-userInfoLeftWrapper, .css-1sosl21-userInfoWrapper > div:first-child"
      },
      {
        title: {
          en: "Info widgets",
          uk: "Інформаційні віджети"
        },
        body: {
          en: "Your business at a glance. Each widget shows a count or summary for one entity. Click any widget → jumps to that section. Numbers update in real time.\n\nDaily routine: scan the widgets → decide where you spend the next 10 minutes.",
          uk: "Ваш бізнес з першого погляду. Кожен віджет показує кількість або підсумок по одній сутності. Клік по будь-якому віджету → перехід до відповідного розділу. Цифри оновлюються в реальному часі.\n\nЩоденна рутина: огляньте віджети → вирішіть, на що витратити наступні 10 хвилин."
        },
        target: "main > div > div:nth-child(2), .ant-layout-content > div > div:nth-child(2)"
      },
      {
        title: {
          en: "Action-required signals",
          uk: "Сигнали, що потребують дії"
        },
        body: {
          en: "The platform tells you when you need to act. Anything highlighted in red (Error) = your decision is waiting (price confirm, tariff change, freelancer result).\n\nResolve it → your frozen money moves.",
          uk: "Платформа підказує, коли потрібна ваша дія. Усе, що виділено червоним (Помилка) = чекає вашого рішення (підтвердження ціни, зміна тарифу, результат фахівця).\n\nВирішили → ваші заморожені кошти йдуть далі."
        },
        target: "main > div > div:nth-child(2) > .css-gkzwjg-wrapper > div > div > div, .css-gkzwjg-wrapper > div > div > div"
      },
      {
        title: {
          en: "Light / Dark theme",
          uk: "Світла / Темна тема"
        },
        body: {
          en: "Light or dark — match your environment. Click here to toggle. The change persists across sessions.",
          uk: "Світла чи темна — обирайте під своє оточення. Клікніть тут, щоб переключити. Налаштування зберігається між сесіями."
        },
        target: "header > div > button:nth-child(4)"
      },
      {
        title: {
          en: "Interface language",
          uk: "Мова інтерфейсу"
        },
        body: {
          en: "Pick your language. The platform supports English and Українська. Click the flag to switch — the whole interface changes instantly.",
          uk: "Оберіть мову. Платформа підтримує English та Українську. Клікніть прапор, щоб переключити — увесь інтерфейс зміниться миттєво."
        },
        target: ".css-v6kmt0-flag"
      },
      {
        title: {
          en: "Sidebar — auto-expand on hover",
          uk: "Бічна панель — авторозкриття при наведенні"
        },
        body: {
          en: "Sidebar collapses to icons by default to save workspace. Hover it → expands with full section names. Move cursor away → auto-collapses.",
          uk: "Бічна панель за замовчуванням згорнута до іконок, щоб не займати робочу зону. Наведіть курсор → розгорнеться з повними назвами розділів. Заберіть курсор → авто-згорнеться."
        },
        target: "aside.ant-layout-sider",
        action: "expand-sidebar"
      },
      {
        title: {
          en: "You're set",
          uk: "Готово"
        },
        body: {
          en: "Next tours waiting for you in the Demo Guide (bottom-right):\n• T2 Navigation\n• T3 Buying a product card\n• T4 Launching an idea\n…and more.\n\nClose this and explore, or jump to another tour now.",
          uk: "Наступні тури чекають у Демо-гіді (праворуч внизу):\n• T2 Навігація\n• T3 Купівля картки товару\n• T4 Запуск ідеї\n…і ще багато.\n\nЗакрийте це вікно й досліджуйте — або одразу запустіть інший тур."
        },
        target: null
      }
    ]
  },
  T2: {
    id: "T2",
    name: {
      en: "Navigation, common UI, Profile / Messages / Support / Updates",
      uk: "Навігація, спільний UI, Профіль / Повідомлення / Підтримка / Оновлення"
    },
    screen: "dashboard",
    available: true,
    steps: [
      {
        title: {
          en: "The map of your platform",
          uk: "Карта вашої платформи"
        },
        body: {
          en: "Every screen shares the same layout: sidebar on the left for navigation, header on top for context and quick actions.\n\n3 minutes — we'll show where Profile, Messages, Support, and Release notes live.",
          uk: "Усі екрани мають однакову структуру: бічна панель ліворуч для навігації, шапка вгорі для контексту та швидких дій.\n\n3 хвилини — покажемо, де знаходяться Профіль, Повідомлення, Підтримка та Історія релізів."
        },
        target: null,
        screen: "dashboard"
      },
      {
        title: {
          en: "Header — context bar",
          uk: "Шапка — панель контексту"
        },
        body: {
          en: "Header tells you where you are and what you can do here.\n• Section title (left)\n• Context subtitle\n• Action buttons specific to this screen (right)\n• User card (far right) → Profile / Exit menu",
          uk: "Шапка показує, де ви знаходитесь і що можете зробити тут.\n• Назва розділу (ліворуч)\n• Підзаголовок з контекстом\n• Кнопки дій, специфічні для цього екрана (праворуч)\n• Картка користувача (крайня праворуч) → меню Профіль / Вийти"
        },
        target: "header",
        screen: "dashboard"
      },
      {
        title: {
          en: "User card → Profile",
          uk: "Картка користувача → Профіль"
        },
        body: {
          en: "Click your user card in the header to open the account menu:\n• Profile — settings, contacts, password\n• Exit — log out\n\nWhen this tour closes, the same click on the user card will open this menu.",
          uk: "Клікніть на свою картку в шапці, щоб відкрити меню облікового запису:\n• Профіль — налаштування, контакти, пароль\n• Вийти — завершити сесію\n\nКоли тур закриється, той самий клік по картці відкриватиме це меню."
        },
        target: "#demo-user-popover-real .ant-dropdown",
        screen: "dashboard",
        action: "show-user-popover"
      },
      {
        title: {
          en: "Sidebar — main navigation",
          uk: "Бічна панель — головна навігація"
        },
        body: {
          en: "Sidebar — your navigation home. Collapsed by default to save screen space. Hover to expand and see full section names. Click any section to navigate.",
          uk: "Бічна панель — основа вашої навігації. Згорнута за замовчуванням, щоб економити простір. Наведіть курсор, щоб розгорнути і побачити повні назви розділів. Клікніть на розділ для переходу."
        },
        target: "aside.ant-layout-sider",
        screen: "dashboard"
      },
      {
        title: {
          en: "Messages",
          uk: "Повідомлення"
        },
        body: {
          en: "Messages section lives in the sidebar. Your chats with team members — a flat list of all conversations. Unread counts on the sidebar Messages tile.\n\nClick the Messages item in the sidebar (when this tour closes) to open it.",
          uk: "Розділ Повідомлення живе в бічній панелі. Ваші чати з командою — плаский список усіх діалогів. Лічильник непрочитаних на плитці Повідомлення в панелі.\n\nКлікніть на пункт Повідомлення в бічній панелі (коли тур закриється), щоб його відкрити."
        },
        target: "aside.ant-layout-sider .ant-menu-item[route='messages']",
        screen: "dashboard",
        action: "expand-sidebar"
      },
      {
        title: {
          en: "Support",
          uk: "Підтримка"
        },
        body: {
          en: "Support lives in the sidebar too. Use it when:\n• You found a bug\n• A feature works strangely\n• You need feedback on a workflow\n\nCreate a ticket → tracked through statuses (Новый → В обработке → Принято → Выполнено).",
          uk: "Підтримка теж у бічній панелі. Використовуйте її, коли:\n• Знайшли помилку\n• Функція працює дивно\n• Потрібен фідбек по робочому процесу\n\nСтворіть тікет → відстежуйте через статуси (Новий → В обробці → Прийнято → Виконано)."
        },
        target: "aside.ant-layout-sider .ant-menu-item[route='support']",
        screen: "dashboard",
        action: "expand-sidebar"
      },
      {
        title: {
          en: "Updates / Release history",
          uk: "Оновлення / Історія релізів"
        },
        body: {
          en: "Stay current on what's new. The version number at the bottom of the sidebar is a link → opens the full release notes.\n\nThat's your platform map. Next: T3 Buying a ready product card.",
          uk: "Стежте за новинками. Номер версії внизу бічної панелі — це посилання → відкриває повну історію релізів.\n\nОсь і вся карта вашої платформи. Далі: T3 Купівля готової картки товару."
        },
        target: "button.css-1m0nxzr-button-version, button[class*='button-version']",
        screen: "dashboard",
        action: "expand-sidebar"
      }
    ]
  },
  T3:  { id: "T3",  name: { en: "Buying a ready product card from exchange",                  uk: "Купівля готової картки товару на біржі" },              available: false },
  T4:  { id: "T4",  name: { en: "Launching a new product: idea → ASIN",                       uk: "Запуск нового товару: ідея → ASIN" },                    available: false },
  T5:  { id: "T5",  name: { en: "Creating + tracking an order",                                uk: "Створення та відстеження замовлення" },                  available: false },
  T6:  { id: "T6",  name: { en: "Working with orders: MyOrders / OrderInfo / PendingOrders",   uk: "Робота із замовленнями: МоїЗамовлення / Інфо / В очікуванні" }, available: false },
  T7:  { id: "T7",  name: { en: "Money flow: where my money is + freeze mechanics",            uk: "Рух коштів: де мої гроші + механіка заморозки" },        available: false },
  T8:  { id: "T8",  name: { en: "Box operations via tasks (Edit / Merge / Split / Group)",     uk: "Операції з коробками через задачі (Редагувати / Об'єднати / Розділити / Групувати)" }, available: false },
  T9:  { id: "T9",  name: { en: "Sending a batch to FBA (+ tariff change handling)",           uk: "Відправлення партії на FBA (+ обробка зміни тарифу)" },  available: false },
  T10: { id: "T10", name: { en: "Service exchange: direct order + open request",                uk: "Біржа сервісів: прямі замовлення та відкриті запити" },  available: false },
  T11: { id: "T11", name: { en: "Shops & Parsing Profiles",                                     uk: "Магазини та профілі парсингу" },                          available: false },
  T12: { id: "T12", name: { en: "Unit Analytics: Inventory tiles + forecasting",                uk: "Юніт-аналітика: плитки інвентарю + прогнозування" },     available: false },
  T13: { id: "T13", name: { en: "Listing Reports: launch campaign tracker by ASIN",             uk: "Звіти по лістингу: трекер кампанії запуску за ASIN" },   available: false }
};
