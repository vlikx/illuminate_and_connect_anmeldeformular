import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { RegistrationFormData, FormErrors } from '../types';
import { Check, Loader2, Send } from 'lucide-react';

const RegistrationForm: React.FC = () => {
  const roleOptions = [
    'Studierende/r',
    'Freund, Familie',
    'Hochschulangehörige/e',
    'Firmenvertreter/in',
    'Absolvent/in',
    'Sonstige Rolle',
  ];
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    comments: '',
    acceptPrivacy: false,
    acceptProcessing: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Vorname ist erforderlich";
    if (!formData.lastName.trim()) newErrors.lastName = "Nachname ist erforderlich";
    if (!formData.email.trim()) {
        newErrors.email = "E-Mail ist erforderlich";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Bitte eine gültige E-Mail eingeben";
    }
    
    if (!formData.role) newErrors.role = "Bitte wählen Sie eine Option aus";
    if (!formData.acceptPrivacy) newErrors.acceptPrivacy = "Bitte akzeptieren Sie die Datenschutzerklärung.";
    if (!formData.acceptProcessing) newErrors.acceptProcessing = "Bitte stimmen Sie der Datenverarbeitung zu.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      console.log("Form Data:", formData);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto p-12 bg-slate-900/90 backdrop-blur-xl border border-fuchsia-500/30 rounded-3xl text-center shadow-[0_0_50px_rgba(217,70,239,0.15)] animate-fade-in">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
          <Check className="w-12 h-12 text-green-400" />
        </div>
        <h3 className="text-4xl font-bold text-white mb-6 font-[Rajdhani] uppercase">Anmeldung erfolgreich!</h3>
        <p className="text-slate-300 mb-10 text-lg">
          Vielen Dank, {formData.firstName}. Wir haben deinen Platz für das Illuminate & Connect Event reserviert. 
          Alle weiteren Infos erhältst du per E-Mail.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-fuchsia-400 hover:text-fuchsia-300 font-bold uppercase tracking-wider transition-colors border-b border-fuchsia-400/30 hover:border-fuchsia-400"
        >
          Zurück zum Formular
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-2xl mx-auto relative group">
        {/* Glow effect behind form */}
        <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-yellow-600 rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-1000" />
        <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-bold text-white mb-2 font-[Rajdhani] uppercase">Jetzt anmelden</h3>
            <p className="text-slate-400">Sichere dir deinen Platz für den Abend. Die Teilnahme ist kostenlos. (Uhrzeit: abends)</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-fuchsia-300/80 uppercase tracking-wider block">Vorname *</label>
              <input 
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className={`w-full bg-white/5 border ${errors.firstName ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-fuchsia-500'} rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-fuchsia-500 transition-all`}
                placeholder="Max"
              />
              {errors.firstName && <span className="text-xs text-red-400">{errors.firstName}</span>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-fuchsia-300/80 uppercase tracking-wider block">Nachname *</label>
              <input 
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className={`w-full bg-white/5 border ${errors.lastName ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-fuchsia-500'} rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-fuchsia-500 transition-all`}
                placeholder="Mustermann"
              />
              {errors.lastName && <span className="text-xs text-red-400">{errors.lastName}</span>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-fuchsia-300/80 uppercase tracking-wider block">E-Mail Adresse *</label>
            <input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-fuchsia-500'} rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-fuchsia-500 transition-all`}
              placeholder="max@beispiel.de"
            />
            {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
          </div>


          <div className="space-y-2">
            <label className="text-xs font-bold text-yellow-300/80 uppercase tracking-wider block">Ich bin ... *</label>
            <Listbox value={formData.role} onChange={val => setFormData({ ...formData, role: val })}>
              <div className="relative">
                <Listbox.Button
                  className={`w-full bg-white/5 border ${errors.role ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-fuchsia-500'} rounded-lg px-4 py-3 text-base text-left text-white font-[Rajdhani] font-normal tracking-wide outline-none transition-all duration-200 focus:shadow-[0_0_16px_rgba(250,204,21,0.15)] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/80`}
                >
                  {formData.role || <span className="opacity-60 font-normal">Bitte wählen ...</span>}
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className="absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-xl bg-black/80 py-2 text-lg shadow-2xl ring-2 ring-yellow-400/30 focus:outline-none animate-fade-in">
                    {roleOptions.map((option) => (
                      <Listbox.Option
                        key={option}
                        value={option}
                        className={({ active, selected }) =>
                          `cursor-pointer select-none relative py-3 px-5 font-[Rajdhani] tracking-wide transition-all duration-100
                          ${active ? 'bg-yellow-400/20 text-yellow-200 scale-[1.03] shadow-[0_0_12px_rgba(250,204,21,0.15)]' : 'text-white'}
                          ${selected ? 'font-extrabold text-yellow-300' : ''}`
                        }
                      >
                        {option}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            {errors.role && <span className="text-xs text-red-400">{errors.role}</span>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-yellow-300/80 uppercase tracking-wider block">Platz für Rückfragen, Anmerkungen</label>
            <textarea
              value={formData.comments}
              onChange={e => setFormData({ ...formData, comments: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
              placeholder="Deine Nachricht ..."
              rows={3}
            />
          </div>

          <div className="space-y-3 mt-6">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="acceptPrivacy"
                checked={formData.acceptPrivacy}
                onChange={e => setFormData({ ...formData, acceptPrivacy: e.target.checked })}
                className="mt-1 accent-yellow-500 focus:ring-2 focus:ring-yellow-400"
              />
              <label htmlFor="acceptPrivacy" className="text-xs text-slate-300 select-none">
                Hiermit akzeptiere ich die{' '}
                <a href="https://www.hs-aalen.de/datenschutz" target="_blank" rel="noopener noreferrer" className="underline text-yellow-300 hover:text-yellow-400">Datenschutzerklärung der Hochschule Aalen</a>.
                <span className="text-pink-400"> *</span>
              </label>
            </div>
            {errors.acceptPrivacy && <div className="text-xs text-red-400 ml-7">{errors.acceptPrivacy}</div>}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="acceptProcessing"
                checked={formData.acceptProcessing}
                onChange={e => setFormData({ ...formData, acceptProcessing: e.target.checked })}
                className="mt-1 accent-yellow-500 focus:ring-2 focus:ring-yellow-400"
              />
              <label htmlFor="acceptProcessing" className="text-xs text-slate-300 select-none">
                Mit der Speicherung und der Verarbeitung meiner Daten zu oben genannten Zwecken bin ich einverstanden. <span className="text-pink-400">*</span>
              </label>
            </div>
            {errors.acceptProcessing && <div className="text-xs text-red-400 ml-7">{errors.acceptProcessing}</div>}
          </div>

          <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-fuchsia-600 to-yellow-500 text-white font-bold text-lg uppercase tracking-wider py-4 rounded-lg hover:from-fuchsia-500 hover:to-yellow-400 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 shadow-lg shadow-fuchsia-900/20"
          >
              {isSubmitting ? (
                  <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Wird gesendet...
                  </>
              ) : (
                  <>
                      <Send className="w-5 h-5" />
                      Kostenlos Anmelden
                  </>
              )}
          </button>
          </form>
        </div>
      </div>
      <div className="text-center mt-24">
        <span className="text-3xl md:text-4xl font-bold font-[Rajdhani] uppercase bg-gradient-to-r from-fuchsia-400 via-yellow-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(250,204,21,0.15)] tracking-wider">
          Wir freuen uns auf euch!
        </span>
      </div>
    </>
  );
};

export default RegistrationForm;