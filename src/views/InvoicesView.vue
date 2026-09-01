<template>
  <div>
    <h1>Fakturor</h1>

    <div class="card">
      <table>
        <thead>
          <tr>
            <th>Faktura</th>
            <th>Period</th>
            <th>Belopp</th>
            <th>Förfaller</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="invoice in invoices"
            :key="invoice.id"
          >
            <td>{{ invoice.id }}</td>
            <td>{{ invoice.period }}</td>
            <td>{{ invoice.amount }} kr</td>
            <td>{{ invoice.due }}</td>

            <td>
              <span
                :class="[
                  'status-chip',
                  invoice.status === 'Betald'
                    ? 'status-betald'
                    : 'status-obetald'
                ]"
              >
                {{ invoice.status }}
              </span>
            </td>

            <td>
              <div
                class="download"
                @click="downloadInvoice(invoice)"
              >
                Ladda ner
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchInvoices } from '../services/api'

const invoices = ref([])

onMounted(async () => {
  invoices.value = await fetchInvoices()
})

const downloadInvoice = (invoice) => {
  console.log('download', invoice.id)
  alert('Nedladdning kommer snart')
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

thead tr {
  border-bottom: 1px solid #e5e7eb;
}

th {
  padding: 14px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: #f9fafb;
}

tbody tr {
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.15s ease;
}

tbody tr:hover {
  background-color: #f9fafb;
}

td {
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
}

tbody tr:last-child {
  border-bottom: none;
}

.download {
  color: #2f54eb;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.download:hover {
  text-decoration: underline;
}

.status-chip {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.status-betald {
  color: #15803d;
  background-color: #dcfce7;
}

.status-obetald {
  color: #b91c1c;
  background-color: #fee2e2;
}
</style>