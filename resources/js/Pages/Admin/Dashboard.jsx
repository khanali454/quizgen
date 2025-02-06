import AuthenticatedLayout from '@/Layouts/admin/AuthenticatedLayout'
import React from 'react'

function Dashboard() {
  return (
    <AuthenticatedLayout>
        <div>Dashboard</div>
    </AuthenticatedLayout>
  )
}

export default Dashboard