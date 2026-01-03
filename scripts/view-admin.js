// Script to view admin user details (password is hashed, not shown)
// Usage: node scripts/view-admin.js [email]

const mysql = require('mysql2/promise')
require('dotenv').config({ path: '.env.local' })

async function viewAdmin() {
  const email = process.argv[2] || null

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'swastik_pharma',
    })

    let query
    let params = []
    
    if (email) {
      query = 'SELECT id, email, role, created_at FROM admins WHERE email = ?'
      params = [email]
    } else {
      query = 'SELECT id, email, role, created_at FROM admins'
    }

    const [results] = await connection.execute(query, params)

    if (results.length === 0) {
      console.log('No admin users found.')
      process.exit(0)
    }

    console.log('\n📋 Admin User(s):\n')
    console.log('─'.repeat(60))
    
    results.forEach((admin, index) => {
      console.log(`\nAdmin #${index + 1}:`)
      console.log(`  ID: ${admin.id}`)
      console.log(`  Email: ${admin.email}`)
      console.log(`  Role: ${admin.role}`)
      console.log(`  Created: ${admin.created_at}`)
      console.log(`  Password: [Hashed - Cannot be displayed]`)
    })
    
    console.log('\n' + '─'.repeat(60))
    console.log('\n💡 Note: Passwords are securely hashed and cannot be viewed.')
    console.log('   To change password, use: node scripts\\update-admin.js\n')

    await connection.end()
  } catch (error) {
    console.error('Error viewing admin:', error.message)
    process.exit(1)
  }
}

viewAdmin()

