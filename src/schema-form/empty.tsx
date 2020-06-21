export const createEmpty = (text: string) => {
  return {
    render() {
      return <span style={{
        fontSize: '11px',
        fontStyle: 'italic',
        color: 'gray'
      }}>{text}</span>;
    }
  };
};
export default createEmpty('');
