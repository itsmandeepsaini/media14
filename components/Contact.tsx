import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-black text-gray-900 dark:text-white mb-4">Entre em Contato</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tem uma história para contar, uma pergunta sobre nossa cobertura ou feedback? Adoraríamos ouvir de você.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-6">
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 text-brand-600 rounded-full flex items-center justify-center mb-4">
                  <Mail size={24} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">E-mail</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Para dúvidas gerais e pautas:</p>
                <a href="mailto:contato@mediagb.org" className="text-brand-600 font-medium hover:underline">contato@mediagb.org</a>
             </div>

             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 text-brand-600 rounded-full flex items-center justify-center mb-4">
                  <Phone size={24} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Telefone</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Seg-Sex, 9h às 18h:</p>
                <a href="tel:+5511999999999" className="text-brand-600 font-medium hover:underline">+55 (11) 99999-9999</a>
             </div>

             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 text-brand-600 rounded-full flex items-center justify-center mb-4">
                  <MapPin size={24} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Redação</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Av. Paulista, 1000<br/>
                  Bela Vista, São Paulo - SP<br/>
                  Brasil
                </p>
             </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-full">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mensagem Enviada!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                    Obrigado por entrar em contato. Nossa equipe analisará sua mensagem e responderá o mais breve possível.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-bold transition-colors"
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nome Completo</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="João Silva"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">E-mail</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="joao@exemplo.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Assunto</label>
                    <select 
                      id="subject" 
                      name="subject" 
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="editorial">Editorial / Sugestão de Pauta</option>
                      <option value="support">Suporte Técnico</option>
                      <option value="advertising">Publicidade e Parcerias</option>
                      <option value="other">Outros</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Mensagem</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                      placeholder="Como podemos ajudar?"
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      className="flex items-center space-x-2 px-8 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-bold transition-all transform hover:scale-105"
                    >
                      <Send size={18} />
                      <span>Enviar Mensagem</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;