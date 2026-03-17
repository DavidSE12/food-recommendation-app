import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileHeader from '@/src/components/profile/ProfileHeader';
import { useUser, UserProfile } from '@/src/context/UserContext';

// ── Option sets ────────────────────────────────────────────────
const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Halal', 'Gluten-Free', 'Dairy-Free', 'Keto'];
const FOOD_OPTIONS = ['Pizza', 'Sushi', 'Burgers', 'Thai', 'Italian', 'Chinese', 'Indian', 'Mexican', 'Vietnamese', 'Korean'];
const ALLERGY_OPTIONS = ['Peanuts', 'Shellfish', 'Gluten', 'Dairy', 'Eggs', 'Soy', 'Tree Nuts'];
const BUDGET_OPTIONS = ['Budget', 'Casual', 'Mid-range', 'Fine Dining'];

const EMPTY_PROFILE: UserProfile = {
  name: '',
  age: '',
  weight: '',
  preferences: [],
  favoriteFoods: [],
  allergies: [],
  budget: 'Casual',
};

// ── Small reusable components ──────────────────────────────────
function SectionLabel({ title }: { title: string }) {
  return <Text style={styles.sectionLabel}>{title}</Text>;
}

function Field({
  label,
  value,
  onChangeText,
  editable,
  keyboardType = 'default',
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  editable: boolean;
  keyboardType?: 'default' | 'numeric';
  placeholder?: string;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {editable ? (
        <TextInput
          style={styles.fieldInput}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholder={placeholder ?? label}
          placeholderTextColor="#bbb"
        />
      ) : (
        <Text style={[styles.fieldValue, !value && styles.fieldEmpty]}>
          {value || '—'}
        </Text>
      )}
    </View>
  );
}

function ChipGroup({
  options,
  selected,
  onToggle,
  editable,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  editable: boolean;
}) {
  return (
    <View style={styles.chipGroup}>
      {options.map(opt => {
        const active = selected.includes(opt);
        if (!editable && !active) return null;
        return (
          <TouchableOpacity
            key={opt}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => editable && onToggle(opt)}
            activeOpacity={editable ? 0.7 : 1}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{opt}</Text>
          </TouchableOpacity>
        );
      })}
      {!editable && selected.length === 0 && (
        <Text style={styles.fieldEmpty}>—</Text>
      )}
    </View>
  );
}

function SingleSelect({
  options,
  selected,
  onSelect,
  editable,
}: {
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
  editable: boolean;
}) {
  return (
    <View style={styles.chipGroup}>
      {options.map(opt => {
        const active = selected === opt;
        if (!editable && !active) return null;
        return (
          <TouchableOpacity
            key={opt}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => editable && onSelect(opt)}
            activeOpacity={editable ? 0.7 : 1}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{opt}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ── Main screen ────────────────────────────────────────────────
export default function Profile() {
  const { userProfile, saveUserProfile, clearUserProfile, isLoading } = useUser();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<UserProfile>(EMPTY_PROFILE);

  // Sync form when profile loads
  useEffect(() => {
    if (userProfile) setForm(userProfile);
  }, [userProfile]);

  const toggleChip = (field: 'preferences' | 'favoriteFoods' | 'allergies', value: string) => {
    setForm(prev => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
      };
    });
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      Alert.alert('Validation', 'Name is required.');
      return;
    }
    setSaving(true);
    await saveUserProfile(form);
    setSaving(false);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm(userProfile ?? EMPTY_PROFILE);
    setEditing(false);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Profile',
      'This will remove all your saved information. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await clearUserProfile();
            setForm(EMPTY_PROFILE);
            setEditing(false);
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color="#FF6B35" style={{ marginTop: 80 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F5F3" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile summary card */}
        <ProfileHeader
          name={form.name || 'Your Name'}
          subtitle={`Age ${form.age || '—'} · ${form.budget || 'Casual'}`}
        />

        {/* ── Personal Info ── */}
        <View style={styles.card}>
          <SectionLabel title="Personal Info" />
          <Field
            label="Full Name"
            value={form.name}
            onChangeText={v => setForm(p => ({ ...p, name: v }))}
            editable={editing}
            placeholder="e.g. John Smith"
          />
          <Field
            label="Age"
            value={form.age}
            onChangeText={v => setForm(p => ({ ...p, age: v }))}
            editable={editing}
            keyboardType="numeric"
            placeholder="e.g. 24"
          />
          <Field
            label="Weight (kg)"
            value={form.weight}
            onChangeText={v => setForm(p => ({ ...p, weight: v }))}
            editable={editing}
            keyboardType="numeric"
            placeholder="e.g. 70"
          />
        </View>

        {/* ── Dietary Preferences ── */}
        <View style={styles.card}>
          <SectionLabel title="Dietary Preferences" />
          <ChipGroup
            options={DIETARY_OPTIONS}
            selected={form.preferences}
            onToggle={v => toggleChip('preferences', v)}
            editable={editing}
          />
        </View>

        {/* ── Favourite Foods ── */}
        <View style={styles.card}>
          <SectionLabel title="Favourite Foods" />
          <ChipGroup
            options={FOOD_OPTIONS}
            selected={form.favoriteFoods}
            onToggle={v => toggleChip('favoriteFoods', v)}
            editable={editing}
          />
        </View>

        {/* ── Allergies ── */}
        <View style={styles.card}>
          <SectionLabel title="Allergies" />
          <ChipGroup
            options={ALLERGY_OPTIONS}
            selected={form.allergies}
            onToggle={v => toggleChip('allergies', v)}
            editable={editing}
          />
        </View>

        {/* ── Budget ── */}
        <View style={styles.card}>
          <SectionLabel title="Budget" />
          <SingleSelect
            options={BUDGET_OPTIONS}
            selected={form.budget}
            onSelect={v => setForm(p => ({ ...p, budget: v }))}
            editable={editing}
          />
        </View>

        {/* ── Action buttons ── */}
        {!editing ? (
          <TouchableOpacity style={styles.btnPrimary} onPress={() => setEditing(true)}>
            <Text style={styles.btnPrimaryText}>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.editActions}>
            <TouchableOpacity style={styles.btnCancel} onPress={handleCancel}>
              <Text style={styles.btnCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSave} onPress={handleSave} disabled={saving}>
              {saving ? (
                <ActivityIndicator color="#FFF" size="small" />
              ) : (
                <Text style={styles.btnSaveText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.btnDelete} onPress={handleDelete}>
          <Text style={styles.btnDeleteText}>Delete Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F5F3',
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40,
    gap: 12,
  },

  // Cards
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FF6B35',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 2,
  },

  // Fields
  field: {
    gap: 4,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1A1A1A',
    backgroundColor: '#FAFAFA',
  },
  fieldValue: {
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '500',
    paddingVertical: 2,
  },
  fieldEmpty: {
    color: '#bbb',
  },

  // Chips
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
  },
  chipActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  chipText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },

  // Buttons
  btnPrimary: {
    backgroundColor: '#FF6B35',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  btnPrimaryText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  editActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  btnCancel: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
  },
  btnCancelText: {
    color: '#555',
    fontSize: 16,
    fontWeight: '600',
  },
  btnSave: {
    flex: 2,
    backgroundColor: '#FF6B35',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnSaveText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  btnDelete: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFCDD2',
    backgroundColor: '#FFF5F5',
  },
  btnDeleteText: {
    color: '#E53935',
    fontSize: 15,
    fontWeight: '600',
  },
});
