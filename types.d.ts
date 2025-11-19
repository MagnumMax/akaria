interface Deal {
  id: number;
  title: string;
  client: string;
  agent: string;
  amount: number;
  status: string;
  summary: string;
  feedback?: {
    liked: string;
    disliked: string;
    rating: number;
    nextStep: string;
  };
}

interface Task {
  id: number;
  title: string;
  due: string;
  status: string;
  completed: boolean;
  agent?: string;
  createdBy?: string;
}

interface Property {
  id: number;
  name: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  agent: string;
  image: string;
  type?: string;
}

interface Interaction {
  date: string;
  type: string;
  message?: string;
  description?: string;
}

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  source: string;
  lastContact: string;
  status: string;
  company?: string;
  position?: string;
  aiSummary?: string;
  notes?: string;
  interactions?: Interaction[];
}

interface AssistantDialog {
  id: number;
  title: string;
  timestamp: string;
  userQuestion: string;
  assistantResponse: string;
  messages: { sender: string; text: string }[];
}

interface NavLink {
  id?: string;
  name?: string;
  icon?: string;
  type?: string;
}

interface Window {
  users: {
    CEO: { name: string; role: string; avatar: string };
    Agent: { name: string; role: string; avatar: string };
    Admin: { name: string; role: string; avatar: string };
  };
  ICONS: { [key: string]: string };
  dealsData: Deal[];
  tasksData: Task[];
  propertiesData: Property[];
  assistantDialogs: AssistantDialog[];
  ceoAnomaly: any;
  teamPulseData: any;
  importedLeads: any[];
  inactiveUsers: any[];
  systemErrors: any[];
  assistantStats: any;
  contactsData: Contact[];
  navLinks: { [key: string]: NavLink[] };

  // Components
  ContactsHeaderPanel: any;
  contactsHeaderPanel: any;
  ContactsTable: any;
  contactsTable: any;
  ContactsCards: any;
  contactsCards: any;
  AddContactModal: any;
  addContactModal: any;
  ContactViewModal: any;
  contactViewModal: any;

  // UI Components
  Table: any;
  Badge: any;
  Button: any;
  Input: any;
  Card: any;
  Select: any;

  // Managers
  contactsManager: any;
}