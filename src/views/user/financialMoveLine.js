import React, {PropTypes} from 'react';

function FinancialMoveLine({onClick, children, fieldForLine, options,index,  ...otherProps}) {
    console.log('yo yo je suis dans al line')
    return (
    <div>
        <div>  {fieldForLine('transactionType', {entityPath: 'financialMove'})} </div>
        <div>  {fieldForLine('amount', {entityPath: 'financialMove'})}  </div>
    </div>
  );
}


FinancialMoveLine.displayName = 'financialMoveLine';
FinancialMoveLine.propTypes = {
    onClick: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string)
};
FinancialMoveLine.defaultProps = {
    options: []
}
export default FinancialMoveLine;
