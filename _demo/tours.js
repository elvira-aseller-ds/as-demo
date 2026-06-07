/* === Tours catalog (T1-T13) ===
 * Inlined so no fetch needed. Each tour: id, name, screens, steps.
 * Step count is computed from steps.length.
 */
window.DEMO_TOURS = {
  T1: {
    id: "T1",
    name: "Dashboard: overview + theme + locale",
    screen: "dashboard",
    available: true,
    steps: [
      {
        title: "Welcome to your platform",
        body: "Your work splits into 4 flows: launch products, order from suppliers, ship batches to FBA, outsource services. Everything you need to act on lives right here on the Dashboard.\n\n3 minutes to set you up.",
        target: null
      },
      {
        title: "Balance widget + Deposit / Withdraw",
        body: "Your wallet at a glance. Available — spend now. Frozen — committed to open operations.\n\nTwo buttons: Deposit opens the deposit modal, Withdraw opens the withdraw modal.",
        target: ".css-2njluh-userInfoLeftWrapper, .css-1sosl21-userInfoWrapper > div:first-child"
      },
      {
        title: "Info widgets",
        body: "Your business at a glance. Each widget shows a count or summary for one entity. Click any widget → jumps to that section. Numbers update in real time.\n\nDaily routine: scan the widgets → decide where you spend the next 10 minutes.",
        target: "main > div > div:nth-child(2), .ant-layout-content > div > div:nth-child(2)"
      },
      {
        title: "Action-required signals",
        body: "The platform tells you when you need to act. Anything highlighted in red (Error) = your decision is waiting (price confirm, tariff change, freelancer result).\n\nResolve it → your frozen money moves.",
        target: "main > div > div:nth-child(2) > .css-gkzwjg-wrapper > div > div > div, .css-gkzwjg-wrapper > div > div > div"
      },
      {
        title: "Light / Dark theme",
        body: "Light or dark — match your environment. Click here to toggle. The change persists across sessions.",
        target: "header > div > button:nth-child(4)"
      },
      {
        title: "Interface language",
        body: "Pick your language. The platform supports English and Українська. Click the flag to switch — the whole interface changes instantly.",
        target: ".css-v6kmt0-flag"
      },
      {
        title: "Updates / Release history",
        body: "Stay current on what's new. The version number at the bottom of the sidebar is a link to the full release notes: latest features, fixes, important updates.",
        target: ".css-1m0nxzr-button-version, .css-1g05xj2-button-wrapper:last-child"
      },
      {
        title: "Sidebar — auto-expand on hover",
        body: "Sidebar collapses to icons by default to save workspace. Hover it → expands with full section names. Move cursor away → auto-collapses.",
        target: "aside.ant-layout-sider"
      },
      {
        title: "You're set",
        body: "Next tours waiting for you in the Demo Guide (bottom-right):\n• T2 Navigation\n• T3 Buying a product card\n• T4 Launching an idea\n…and more.\n\nClose this and explore, or jump to another tour now.",
        target: null
      }
    ]
  },
  T2: {
    id: "T2",
    name: "Navigation, common UI, Profile / Messages / Support / Updates",
    screen: "dashboard",
    available: true,
    steps: [
      {
        title: "The map of your platform",
        body: "Every screen shares the same layout: sidebar on the left for navigation, header on top for context and quick actions.\n\n3 minutes — we'll show where Profile, Messages, Support, and Release notes live.",
        target: null,
        screen: "dashboard"
      },
      {
        title: "Header — context bar",
        body: "Header tells you where you are and what you can do here.\n• Section title (left)\n• Context subtitle\n• Action buttons specific to this screen (right)\n• User card (far right) → Profile / Exit menu",
        target: "header",
        screen: "dashboard"
      },
      {
        title: "User card → Profile",
        body: "Click your user card in the header to open the account menu:\n• Profile — settings, contacts, password\n• Exit — log out\n\nWhen this tour closes, the same click on the user card will open this menu.",
        target: "#demo-user-popover-real .ant-dropdown",
        screen: "dashboard",
        action: "show-user-popover"
      },
      {
        title: "Sidebar — main navigation",
        body: "Sidebar — your navigation home. Collapsed by default to save screen space. Hover to expand and see full section names. Click any section to navigate.",
        target: "aside.ant-layout-sider",
        screen: "dashboard"
      },
      {
        title: "Messages",
        body: "Messages section lives in the sidebar. Your chats with team members — a flat list of all conversations. Unread counts on the sidebar Messages tile.\n\nClick the Messages item in the sidebar (when this tour closes) to open it.",
        target: "aside.ant-layout-sider .ant-menu-item[route='messages']",
        screen: "dashboard",
        action: "expand-sidebar"
      },
      {
        title: "Support",
        body: "Support lives in the sidebar too. Use it when:\n• You found a bug\n• A feature works strangely\n• You need feedback on a workflow\n\nCreate a ticket → tracked through statuses (Новый → В обработке → Принято → Выполнено).",
        target: "aside.ant-layout-sider .ant-menu-item[route='support']",
        screen: "dashboard",
        action: "expand-sidebar"
      },
      {
        title: "Updates / Release history",
        body: "Stay current on what's new. The version number at the bottom of the sidebar is a link → opens the full release notes.\n\nThat's your platform map. Next: T3 Buying a ready product card.",
        target: "button.css-1m0nxzr-button-version, button[class*='button-version']",
        screen: "dashboard",
        action: "expand-sidebar"
      }
    ]
  },
  T3:  { id: "T3",  name: "Buying a ready product card from exchange",                    available: false },
  T4:  { id: "T4",  name: "Launching a new product: idea → ASIN",                     available: false },
  T5:  { id: "T5",  name: "Creating + tracking an order",                                  available: false },
  T6:  { id: "T6",  name: "Working with orders: MyOrders / OrderInfo / PendingOrders",    available: false },
  T7:  { id: "T7",  name: "Money flow: where my money is + freeze mechanics",             available: false },
  T8:  { id: "T8",  name: "Box operations via tasks (Edit / Merge / Split / Group)",      available: false },
  T9:  { id: "T9",  name: "Sending a batch to FBA (+ tariff change handling)",            available: false },
  T10: { id: "T10", name: "Service exchange: direct order + open request",                 available: false },
  T11: { id: "T11", name: "Shops & Parsing Profiles",                                       available: false },
  T12: { id: "T12", name: "Unit Analytics: Inventory tiles + forecasting",                 available: false },
  T13: { id: "T13", name: "Listing Reports: launch campaign tracker by ASIN",              available: false }
};
