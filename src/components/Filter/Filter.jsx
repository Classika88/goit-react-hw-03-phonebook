import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ filterContacts, value }) => {
  return (
    <label className={css.name} htmlFor="">
      Find contacts by name
      <input
        type="text"
        name="name"
        value={value}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={filterContacts}
        className={css.userName}
      />
    </label>
  );
};

Filter.propTypes = {
  filterContacts: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
