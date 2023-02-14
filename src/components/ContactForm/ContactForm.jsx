import { nanoid } from 'nanoid';
import { Component } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export class ContactForm extends Component {
  static propTypes = {
    addContact: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleFormChange = event => {
    const target = event.target.name;
    const value = event.target.value;

    this.setState({
      [target]: value,
    });
  };

  handleFormSumbit = event => {
    event.preventDefault();

    const { name, number } = this.state;
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    this.props.addContact(newContact);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <div>
        <form className={css.form} onSubmit={this.handleFormSumbit}>
          <p className={css.inputTitle}>Name</p>
          <input
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={this.handleFormChange}
            required
          />
          <p className={css.inputTitle}>Number</p>
          <input
            type="tel"
            name="number"
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={this.handleFormChange}
            required
          />
          <button className={css.submitBtn} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
