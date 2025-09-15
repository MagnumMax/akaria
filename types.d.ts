// Global type definitions for the project

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  tags: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

interface Deal {
  id: number;
  title: string;
  value: number;
  stage: string;
  contact_id: number;
  created_at: string;
  updated_at: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  due: string; // Alternative field name used in data
  status: string;
  completed: boolean;
  contact_id: number;
  created_at: string;
  updated_at: string;
}

interface Property {
  id: number;
  name: string;
  address: string;
  location: string;
  type: string;
  price: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Assistant {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface Window {
  contactsData: Contact[];
  dealsData: Deal[];
  tasksData: Task[];
  propertiesData: Property[];
  assistantsData: Assistant[];
  iconsData: any;
  ContactsTable: any;
  contactsTable: any;
  HeaderPanel: any;
  headerPanel: any;
  ContactsCards: any;
  contactsCards: any;
  AddContactModal: any;
  ContactViewModal: any;
  showContactCard: (contactId: number) => void;
  showAddContactModal: () => void;
  closeAddContactModal: () => void;
  closeContactViewModal: () => void;
  loadContacts: () => Promise<void>;
  renderContacts: () => void;
  initializeComponents: () => void;
  debugContacts: () => void;
  state: any;
}

// Global class declarations
declare class ContactsTable {
  constructor();
  renderContacts(contacts: Contact[]): void;
}

declare class ContactsCards {
  constructor();
  renderContacts(contacts: Contact[]): void;
}

declare var window: Window & typeof globalThis;