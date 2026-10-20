// QueueBank: a FIFO queue implemented with a JavaScript array.
// push() = enqueue, shift() = dequeue, queue[0] = front/peek.
const STORAGE_KEY = 'queuebank_demo_v1';
let queue = [];
let served = [];
let nextNumber = 1;
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  if (Array.isArray(saved.queue)) queue = saved.queue.filter(c => c && typeof c.name === 'string' && typeof c.ticket === 'string');
  if (Array.isArray(saved.served)) served = saved.served.filter(c => c && typeof c.name === 'string' && typeof c.ticket === 'string');
  if (Number.isSafeInteger(saved.nextNumber) && saved.nextNumber > 0) nextNumber = saved.nextNumber;
} catch (error) { console.warn('Unable to restore queue state:', error); }
const $ = id => document.getElementById(id);
const ticketFor = number => `B${String(number).padStart(3, '0')}`;
function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ queue, served, nextNumber })); } catch (error) { console.warn('Unable to save queue state:', error); } }
function node(tag, className, content) { const element = document.createElement(tag); if (className) element.className = className; if (content !== undefined) element.textContent = content; return element; }
function render() {
  $('waitingCount').textContent = queue.length;
  $('servedCount').textContent = served.length;
  $('nextTicket').textContent = ticketFor(nextNumber);
  $('queuePill').textContent = `${queue.length} waiting`;
  $('serveButton').disabled = queue.length === 0;
  $('frontName').textContent = queue.length ? queue[0].name : 'No customers waiting';
  $('frontTicket').textContent = queue.length ? `Ticket ${queue[0].ticket}` : 'Queue is empty';
  const list = $('queueList'); list.replaceChildren();
  if (!queue.length) list.append(node('div', 'empty', 'The queue is empty. Add a customer to get started.'));
  queue.forEach((customer, index) => {
    const item = node('div', `customer${index === 0 ? ' front' : ''}`);
    item.append(node('span', 'ticket', customer.ticket));
    const info = node('div', 'customer-info');
    info.append(node('strong', '', customer.name), node('small', '', index === 0 ? 'FRONT · Next to be served' : index === queue.length - 1 ? 'REAR · Last in line' : `Position ${index + 1}`));
    item.append(info); list.append(item);
  });
  const history = $('servedList'); history.replaceChildren();
  if (!served.length) history.append(node('div', '', 'No customers served yet.'));
  served.slice(-5).reverse().forEach(customer => history.append(node('div', 'served-item', `✓ ${customer.ticket} · ${customer.name}`)));
}
$('customerForm').addEventListener('submit', event => {
  event.preventDefault();
  const input = $('customerName'); const name = input.value.trim().replace(/\s+/g, ' ');
  if (!name) { $('message').textContent = 'Please enter a customer name.'; return; }
  const ticket = ticketFor(nextNumber++);
  queue.push({ name, ticket }); // ENQUEUE: add to the rear
  input.value = ''; $('message').textContent = `${name} added to the rear with ticket ${ticket}.`;
  save(); render(); input.focus();
});
$('serveButton').addEventListener('click', () => {
  if (!queue.length) { $('message').textContent = 'No customers waiting.'; return; }
  const customer = queue.shift(); // DEQUEUE: remove from the front
  served.push(customer);
  $('message').textContent = `Now served: ${customer.name} (${customer.ticket}).`;
  save(); render();
});
$('resetButton').addEventListener('click', () => {
  if (!confirm('Clear the waiting queue and served history?')) return;
  queue = []; served = []; nextNumber = 1;
  $('message').textContent = 'Demo reset successfully.';
  save(); render();
});
render();
