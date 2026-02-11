export const saveTicket = (ticket, email) => {
  if (!email) return; 

  const key = `tickets_${email}`; 
  const existing = JSON.parse(localStorage.getItem(key)) || [];
  const updated = [...existing, ticket];

  localStorage.setItem(key, JSON.stringify(updated));
};


export const getTickets = (email) => {
  if (!email) return [];
  const key = `tickets_${email}`;
  return JSON.parse(localStorage.getItem(key)) || [];
};