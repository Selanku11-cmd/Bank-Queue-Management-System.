# QueueBank | Bank Customer Queue Management

An interactive real-world queue data structure project built with HTML, CSS, and JavaScript.

## How to run
Open `index.html` in any modern web browser. No installation or internet connection is needed.

## Features
- Add a customer to the rear of the queue (enqueue)
- Serve the first customer (dequeue)
- See the next customer (front/peek)
- Display the full queue in arrival order
- Track customers served and ticket numbers
- Preserve the queue across browser refreshes using localStorage
- Reset the demo

## Why queues?
A queue uses First In, First Out (FIFO). The first customer who joins the line is served first, maintaining fairness and order.

## How the queue works in JavaScript
- `queue.push(customer)` adds a customer to the rear (enqueue).
- `queue.shift()` removes the first customer (dequeue).
- `queue[0]` reads the first customer without removing them (front/peek).
- `queue.length` counts waiting customers.

## Other real-world queue applications
1. Printer management: jobs print in submission order.
2. Customer support: incoming requests wait to be handled.
3. Supermarket checkout: customers are served in arrival order.
4. Ticketing: customers wait for their turn.
5. CPU scheduling: ready processes may be scheduled using FIFO.
6. Hospitals: ordinary appointment lines can use FIFO, while emergencies need priority-based scheduling.

## Deploy
Upload the three website files to a GitHub repository and import the repository into Vercel as a static site. No build command is required.
