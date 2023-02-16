import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import css from './App.module.css';
import Notiflix from 'notiflix';
import { Component } from 'react';

export class App extends Component {
  state = {
    contacts: JSON.parse(localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addNewContact = newContact => {
    if (this.state.contacts.some(contact => contact.name === newContact.name)) {
      Notiflix.Notify.failure(`${newContact.name} is already in the contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleClick = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilter = event => {
    if (
      !this.state.contacts.some(contact =>
        contact.name.includes(event.target.value)
      )
    ) {
      Notiflix.Notify.failure(`${event.target.value} is not in the contacts`);
    }
    this.setState({ filter: event.target.value });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .trim()
        .includes(this.state.filter.toLowerCase());
    });

    return (
      <div>
        <div action="" className={css.phonebook}>
          <h1 className={css.phonebookTitle}>Phonebook</h1>
          <ContactForm addContact={this.addNewContact} />
          <h1 className={css.contactTitle}>Contacts</h1>
          <Filter
            filterContacts={this.handleFilter}
            value={this.state.filter}
          />
          <ContactList
            contacts={filteredContacts}
            deleteContact={this.handleClick}
          />
        </div>
      </div>
    );
  }
}
