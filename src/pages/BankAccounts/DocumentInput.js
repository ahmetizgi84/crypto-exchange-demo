const formatCPF = (input) => {
    if (!input) {
      return "";
    }
    const cleanIban = input
      .replace(/\s\s+/g, " ")
      .replace(/[^0-9a-zA-Z]/gi, "")
      .toUpperCase();
  
    const parts = [];
    
    if (cleanIban.length > 0) {
      parts.push(cleanIban.substring(0, 4));
    }
  
    if (cleanIban.length > 4) {
      parts.push(cleanIban.substring(4, 8));
    }
  
    if (cleanIban.length > 8) {
      parts.push(cleanIban.substring(8, 12));
    }
  
    if (cleanIban.length > 12) {
      parts.push(cleanIban.substring(12, 16));
    }
  
    if (cleanIban.length > 16) {
      parts.push(cleanIban.substring(16, 20));
    }
  
    if (cleanIban.length > 20) {
        parts.push(cleanIban.substring(20, 24));
    }

    if (cleanIban.length > 24) {
        parts.push(cleanIban.substring(24, 26));
    }
  
    return parts.join(" ");
  };
  const DocumentInput = ({ onChange, value, ...props }) => {
    const handleChange = (e) => {
      onChange({
        ...e,
        target: {
          ...e.target,
          value: formatCPF(e.target.value)
        }
      });
    };
  
    return <input {...props} value={formatCPF(value)} onChange={handleChange} />;
  };
  
  export default DocumentInput;