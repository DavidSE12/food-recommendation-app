import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useUser, UserProfile } from '@/src/context/UserContext';

const { width } = Dimensions.get('window');

const DIETARY_OPTIONS = [
  { label: '🥗 Vegetarian', value: 'Vegetarian' },
  { label: '🌱 Vegan', value: 'Vegan' },
  { label: '🌙 Halal', value: 'Halal' },
  { label: '✡️ Kosher', value: 'Kosher' },
  { label: '🌾 Gluten-Free', value: 'Gluten-Free' },
  { label: '🥛 Dairy-Free', value: 'Dairy-Free' },
  { label: '🌶️ Loves Spicy', value: 'Loves Spicy' },
  { label: '🐟 Pescatarian', value: 'Pescatarian' },
];

const FOOD_OPTIONS = [
  { label: '🍕 Pizza', value: 'Pizza' },
  { label: '🍣 Sushi', value: 'Sushi' },
  { label: '🍔 Burgers', value: 'Burgers' },
  { label: '🍜 Ramen', value: 'Ramen' },
  { label: '🌮 Tacos', value: 'Tacos' },
  { label: '🍛 Curry', value: 'Curry' },
  { label: '🥗 Salads', value: 'Salads' },
  { label: '🍝 Pasta', value: 'Pasta' },
  { label: '🥩 BBQ', value: 'BBQ' },
  { label: '🧆 Middle Eastern', value: 'Middle Eastern' },
  { label: '🥟 Dumplings', value: 'Dumplings' },
  { label: '🍱 Bento', value: 'Bento' },
];

const ALLERGY_OPTIONS = [
  { label: '🥜 Nuts', value: 'Nuts' },
  { label: '🥛 Dairy', value: 'Dairy' },
  { label: '🌾 Gluten', value: 'Gluten' },
  { label: '🥚 Eggs', value: 'Eggs' },
  { label: '🦐 Shellfish', value: 'Shellfish' },
  { label: '🫘 Soy', value: 'Soy' },
  { label: '🐟 Fish', value: 'Fish' },
  { label: '✅ None', value: 'None' },
];

const BUDGET_OPTIONS = [
  { label: '💰 Budget', sub: 'Under $15', value: 'Budget' },
  { label: '🍽️ Casual', sub: '$15 – $30', value: 'Casual' },
  { label: '✨ Mid-range', sub: '$30 – $60', value: 'Mid-range' },
  { label: '👑 Fine Dining', sub: '$60+', value: 'Fine Dining' },
];

const TOTAL_STEPS = 6;

export default function Onboarding() {
  const router = useRouter();
  const { saveUserProfile } = useUser();
  const slideAnim = useRef(new Animated.Value(0)).current;

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    age: '',
    weight: '',
    preferences: [] as string[],
    favoriteFoods: [] as string[],
    allergies: [] as string[],
    budget: '',
  });

  const animateToNext = (nextStep: number) => {
    Animated.sequence([
      Animated.timing(slideAnim, { toValue: -30, duration: 150, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
    setStep(nextStep);
  };

  const toggleChip = (field: 'preferences' | 'favoriteFoods' | 'allergies', value: string) => {
    setForm(prev => {
      const current = prev[field];
      if (value === 'None') return { ...prev, [field]: ['None'] };
      const filtered = current.filter(v => v !== 'None');
      return {
        ...prev,
        [field]: filtered.includes(value)
          ? filtered.filter(v => v !== value)
          : [...filtered, value],
      };
    });
  };

  const canProceed = () => {
    if (step === 0) return form.name.trim().length > 0;
    if (step === 1) return form.age.trim().length > 0 && form.weight.trim().length > 0;
    return true;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      animateToNext(step + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (step > 0) animateToNext(step - 1);
  };

  const handleFinish = async () => {
    const profile: UserProfile = {
      name: form.name.trim(),
      age: form.age.trim(),
      weight: form.weight.trim(),
      preferences: form.preferences,
      favoriteFoods: form.favoriteFoods,
      allergies: form.allergies,
      budget: form.budget || 'Casual',
    };
    await saveUserProfile(profile);
    router.replace('/(tabs)/home');
  };

  const progressWidth = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7F3" />

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressFill, { width: `${progressWidth}%` }]} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
            {/* Step 0 — Name */}
            {step === 0 && (
              <View style={styles.stepContainer}>
                <Text style={styles.emoji}>👋</Text>
                <Text style={styles.stepTitle}>Welcome!</Text>
                <Text style={styles.stepSubtitle}>Let's personalise your food experience. What's your name?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your name"
                  placeholderTextColor="#C0A090"
                  value={form.name}
                  onChangeText={t => setForm(p => ({ ...p, name: t }))}
                  autoFocus
                />
              </View>
            )}

            {/* Step 1 — Age & Weight */}
            {step === 1 && (
              <View style={styles.stepContainer}>
                <Text style={styles.emoji}>📏</Text>
                <Text style={styles.stepTitle}>About You</Text>
                <Text style={styles.stepSubtitle}>We use this to suggest healthier options for you.</Text>
                <View style={styles.row}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={styles.inputLabel}>Age</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. 22"
                      placeholderTextColor="#C0A090"
                      keyboardType="numeric"
                      value={form.age}
                      onChangeText={t => setForm(p => ({ ...p, age: t.replace(/[^0-9]/g, '') }))}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.inputLabel}>Weight (kg)</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. 65"
                      placeholderTextColor="#C0A090"
                      keyboardType="numeric"
                      value={form.weight}
                      onChangeText={t => setForm(p => ({ ...p, weight: t.replace(/[^0-9.]/g, '') }))}
                    />
                  </View>
                </View>
              </View>
            )}

            {/* Step 2 — Dietary Preferences */}
            {step === 2 && (
              <View style={styles.stepContainer}>
                <Text style={styles.emoji}>🥗</Text>
                <Text style={styles.stepTitle}>Dietary Preferences</Text>
                <Text style={styles.stepSubtitle}>Select all that apply. We'll tailor recommendations for you.</Text>
                <View style={styles.chipGrid}>
                  {DIETARY_OPTIONS.map(opt => (
                    <TouchableOpacity
                      key={opt.value}
                      style={[styles.chip, form.preferences.includes(opt.value) && styles.chipSelected]}
                      onPress={() => toggleChip('preferences', opt.value)}
                    >
                      <Text style={[styles.chipText, form.preferences.includes(opt.value) && styles.chipTextSelected]}>
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Step 3 — Favourite Foods */}
            {step === 3 && (
              <View style={styles.stepContainer}>
                <Text style={styles.emoji}>❤️</Text>
                <Text style={styles.stepTitle}>Favourite Foods</Text>
                <Text style={styles.stepSubtitle}>What cuisines and foods do you love most?</Text>
                <View style={styles.chipGrid}>
                  {FOOD_OPTIONS.map(opt => (
                    <TouchableOpacity
                      key={opt.value}
                      style={[styles.chip, form.favoriteFoods.includes(opt.value) && styles.chipSelected]}
                      onPress={() => toggleChip('favoriteFoods', opt.value)}
                    >
                      <Text style={[styles.chipText, form.favoriteFoods.includes(opt.value) && styles.chipTextSelected]}>
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Step 4 — Allergies */}
            {step === 4 && (
              <View style={styles.stepContainer}>
                <Text style={styles.emoji}>⚠️</Text>
                <Text style={styles.stepTitle}>Any Allergies?</Text>
                <Text style={styles.stepSubtitle}>We'll warn you about ingredients you should avoid.</Text>
                <View style={styles.chipGrid}>
                  {ALLERGY_OPTIONS.map(opt => (
                    <TouchableOpacity
                      key={opt.value}
                      style={[styles.chip, form.allergies.includes(opt.value) && styles.chipSelected]}
                      onPress={() => toggleChip('allergies', opt.value)}
                    >
                      <Text style={[styles.chipText, form.allergies.includes(opt.value) && styles.chipTextSelected]}>
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Step 5 — Budget */}
            {step === 5 && (
              <View style={styles.stepContainer}>
                <Text style={styles.emoji}>💵</Text>
                <Text style={styles.stepTitle}>Your Budget</Text>
                <Text style={styles.stepSubtitle}>How much do you usually spend per meal?</Text>
                <View style={styles.budgetGrid}>
                  {BUDGET_OPTIONS.map(opt => (
                    <TouchableOpacity
                      key={opt.value}
                      style={[styles.budgetCard, form.budget === opt.value && styles.budgetCardSelected]}
                      onPress={() => setForm(p => ({ ...p, budget: opt.value }))}
                    >
                      <Text style={styles.budgetEmoji}>{opt.label.split(' ')[0]}</Text>
                      <Text style={[styles.budgetLabel, form.budget === opt.value && styles.budgetLabelSelected]}>
                        {opt.label.split(' ').slice(1).join(' ')}
                      </Text>
                      <Text style={[styles.budgetSub, form.budget === opt.value && styles.budgetSubSelected]}>
                        {opt.sub}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </Animated.View>
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={styles.navRow}>
          {step > 0 ? (
            <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
              <Text style={styles.backBtnText}>← Back</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ flex: 1 }} />
          )}

          <TouchableOpacity
            style={[styles.nextBtn, !canProceed() && styles.nextBtnDisabled]}
            onPress={handleNext}
            disabled={!canProceed()}
          >
            <Text style={styles.nextBtnText}>
              {step === TOTAL_STEPS - 1 ? "Let's Eat! 🍽️" : 'Next →'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Step dots */}
        <View style={styles.dots}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
          ))}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF7F3',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#FFE0D0',
    marginHorizontal: 0,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  stepContainer: {
    minHeight: 400,
  },
  emoji: {
    fontSize: 52,
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  stepSubtitle: {
    fontSize: 15,
    color: '#888',
    lineHeight: 22,
    marginBottom: 28,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#FFD5C0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1A1A1A',
  },
  row: {
    flexDirection: 'row',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#FFD5C0',
  },
  chipSelected: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  chipText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#FFF',
    fontWeight: '700',
  },
  budgetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  budgetCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFD5C0',
  },
  budgetCardSelected: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  budgetEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  budgetLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  budgetLabelSelected: {
    color: '#FFF',
  },
  budgetSub: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
  },
  budgetSubSelected: {
    color: 'rgba(255,255,255,0.8)',
  },
  navRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 8,
    gap: 12,
  },
  backBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#FFD5C0',
    alignItems: 'center',
  },
  backBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
  nextBtn: {
    flex: 2,
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextBtnDisabled: {
    backgroundColor: '#FFCAB5',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 12,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD5C0',
  },
  dotActive: {
    backgroundColor: '#FF6B35',
    width: 20,
  },
});
