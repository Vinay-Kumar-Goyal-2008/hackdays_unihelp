const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatbox = document.getElementById('chatbox');
const complaintList = document.getElementById('complaintList tbody');
const logoutBtn = document.getElementById('logoutBtn');


const faqResponses = {
  "hostel": "Hostel gates are open from 6 AM to 10 PM.",
  "library": "Library is open from 9 AM to 8 PM on weekdays.",
  "fees": "Fees can be paid via ERP portal before 10th of each month.",
  "wifi": "WiFi complaints are handled by the IT department."
};


async function complaintlistget() {
  let n=0
    let complaints=await fetch('/getcomplaintslist')
    complaints=await complaints.json()
    complaints.forEach(e => {
      complaintList.innerHTML+=`<tr>
      <td>${n+1}</td>
      <td>${e.title}</td>
      <td>${e.status}</td>
      </tr>`
      n+=1
    })
}

complaintlistget()


document.getElementById('queryForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const query = document.getElementById('queryInput').value;

  const response = await fetch('/submit-query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({query: query })
  });

  const result = await response.json();

  document.getElementById('formMessage').textContent =
    result.message || 'Your query has been submitted successfully!';
  document.getElementById('queryForm').reset();
});
