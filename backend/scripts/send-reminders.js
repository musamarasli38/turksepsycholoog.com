#!/usr/bin/env node

/**
 * Appointment Reminder Cron Job
 *
 * This script sends SMS reminders for appointments scheduled for tomorrow.
 *
 * Usage:
 *   node backend/scripts/send-reminders.js
 *
 * To run automatically (Linux/Mac):
 *   Add to crontab: 0 8 * * * cd /path/to/project && node backend/scripts/send-reminders.js
 *   This runs every day at 8:00 AM
 *
 * To run automatically (Windows):
 *   Use Task Scheduler to run this script daily
 */

import dotenv from 'dotenv';
import { sendAppointmentReminders } from '../src/services/smsReminder.js';

dotenv.config();

async function main() {
  console.log('========================================');
  console.log('Appointment Reminder Cron Job');
  console.log('Started at:', new Date().toISOString());
  console.log('========================================\n');

  try {
    const result = await sendAppointmentReminders();

    if (result.success) {
      console.log('\n✓ SUCCESS');
      console.log('Reminders sent:', result.successCount);
      console.log('Reminders failed:', result.failureCount);
      console.log('Total appointments:', result.totalAppointments);

      if (result.results && result.results.length > 0) {
        console.log('\nDetails:');
        result.results.forEach((r, index) => {
          console.log(`  ${index + 1}. Appointment ${r.appointment_id} (${r.client_phone}): ${r.status}`);
          if (r.error) {
            console.log(`     Error: ${r.error}`);
          }
        });
      }
    } else {
      console.log('\n✗ FAILED');
      console.log('Error:', result.error);
    }

    console.log('\n========================================');
    console.log('Completed at:', new Date().toISOString());
    console.log('========================================\n');

    process.exit(result.success ? 0 : 1);
  } catch (error) {
    console.error('\n✗ CRITICAL ERROR');
    console.error('Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
