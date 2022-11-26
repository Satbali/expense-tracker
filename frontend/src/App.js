import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Using setstate for setting the initial values of the form
  const [form, setForm] = useState({
    amount: 0,
    description: '',
    date: ''
  })

  useEffect(() => {
    fetchTransaction()
  }, [])

  const [transactions, setTransactions] = useState([])
  const fetchTransaction = async () => {
    // GET route
    const res = await fetch('http://localhost:4000/transaction')
    const { data } = await res.json()
    setTransactions(data)
  }

  // On change of input this happens
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  // On submitting the form api is fetched and the data get posted
  async function handleSubmit(e) {
    e.preventDefault();
    // POST route
    const res = await fetch('http://localhost:4000/transaction', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json'
      }
    })
    // const data = await res.json()
    if (res.status === 200) {
      fetchTransaction()
    }
  }

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input required
            type="number"
            name='amount'
            value={form.amount}
            onChange={handleChange}
            placeholder='Enter the transaction amount' />
          <input required
            type="text"
            name='description'
            value={form.description}
            onChange={handleChange}
            placeholder='Enter the transaction details' />
          <input required
            type="date"
            name="date"
            onChange={handleChange}
            value={form.date} />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="">
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trx) => (
              <tr key={trx._id}>
                <td>{trx.amount}</td>
                <td>{trx.description}</td>
                <td>{trx.date}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
