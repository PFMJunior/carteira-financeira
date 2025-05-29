// useCurrencyFormatter.ts
const useCurrencyFormatter = (value: number | string | undefined | null) => {
    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    };

    let numericValue: number;

    if (typeof value === 'number') {
        numericValue = value;
    } else if (typeof value === 'string') {
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue)) {
            numericValue = parsedValue;
        } else {
            return 'R$ 0,00'; // Retorna um valor padrão para string inválida
        }
    } else {
        return 'R$ 0,00'; // Retorna um valor padrão para undefined/null
    }

    return formatCurrency(numericValue);
};

export default useCurrencyFormatter;