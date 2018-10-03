/**
 *
 * @param {string} value
 */
export const formatCpfCnpj = (value) => {
  if (value.length === 11) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

/**
 *
 * @param {string} value ISO Date
 * @param {string} locale locale identification, like pt-BR, en-US, etc..
 */

export const convertToLocaleDate = (value, locale = 'pt-BR') => {
  try {
    if (!value) {
      throw 'Invalid date';
    }

    const _date = new Date(value);
    return _date.toLocaleDateString(locale, {day: '2-digit', month: '2-digit', year: 'numeric'});

  } catch (err) {
    return undefined;
  }
}
