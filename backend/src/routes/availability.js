import express from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Get all availability slots for the logged-in psychologist
router.get('/', authenticateUser, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('availability_slots')
      .select('*')
      .eq('created_by', req.user.id)
      .order('day_of_week', { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
});

// Create a new availability slot
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { day_of_week, start_time, end_time, slot_duration_minutes } = req.body;

    // Validation
    if (day_of_week === undefined || !start_time || !end_time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (day_of_week < 0 || day_of_week > 6) {
      return res.status(400).json({ error: 'day_of_week must be 0-6' });
    }

    const { data, error } = await supabase
      .from('availability_slots')
      .insert([
        {
          day_of_week,
          start_time,
          end_time,
          slot_duration_minutes: slot_duration_minutes || 60,
          created_by: req.user.id,
        },
      ])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating availability:', error);
    res.status(500).json({ error: 'Failed to create availability' });
  }
});

// Update an availability slot
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { day_of_week, start_time, end_time, slot_duration_minutes } = req.body;

    // Check if slot belongs to the user
    const { data: existingSlot, error: fetchError } = await supabase
      .from('availability_slots')
      .select('*')
      .eq('id', id)
      .eq('created_by', req.user.id)
      .single();

    if (fetchError || !existingSlot) {
      return res.status(404).json({ error: 'Availability slot not found' });
    }

    const { data, error } = await supabase
      .from('availability_slots')
      .update({
        ...(day_of_week !== undefined && { day_of_week }),
        ...(start_time && { start_time }),
        ...(end_time && { end_time }),
        ...(slot_duration_minutes && { slot_duration_minutes }),
      })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data[0]);
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ error: 'Failed to update availability' });
  }
});

// Delete an availability slot
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if slot belongs to the user
    const { data: existingSlot, error: fetchError } = await supabase
      .from('availability_slots')
      .select('*')
      .eq('id', id)
      .eq('created_by', req.user.id)
      .single();

    if (fetchError || !existingSlot) {
      return res.status(404).json({ error: 'Availability slot not found' });
    }

    const { error } = await supabase
      .from('availability_slots')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ message: 'Availability slot deleted successfully' });
  } catch (error) {
    console.error('Error deleting availability:', error);
    res.status(500).json({ error: 'Failed to delete availability' });
  }
});

export default router;
