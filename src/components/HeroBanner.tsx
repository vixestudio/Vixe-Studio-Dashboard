import React, { useState } from 'react';
import { Bot, Sparkles, Send, MessageCircle } from 'lucide-react';
import { AI_MASCOTS } from '../data/mockData';

interface HeroBannerProps {
  onOpenDirectImageModal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenDirectImageModal }) => {
  const [isTryoutModalOpen, setIsTryoutModalOpen] = useState(false);
  const [selectedMascot, setSelectedMascot] = useState(AI_MASCOTS[0]);
  const [userChatInput, setUserChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; isBot: boolean }>>([
    {
      sender: 'Echo Eagle',
      text: 'Ei @Krypton! Você acabou de vencer o torneio de Valorant no servidor! Parabéns pela vitória épica! 🦅',
      isBot: true,
    },
    {
      sender: "Garrison's Angel",
      text: 'Boas-vindas @Matt! É uma alegria imensa ter você conosco. Que sua estadia aqui seja incrível e cheia de diversão! ✨',
      isBot: true,
    },
    {
      sender: 'Pixel Devil',
      text: 'Uau, parece que o Adenn finalmente subiu de nível! Continue ativo se quiser alcançar o topo do placar de XP! 😈',
      isBot: true,
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userChatInput.trim()) return;

    const userText = userChatInput.trim();
    setChatMessages((prev) => [...prev, { sender: 'Você', text: userText, isBot: false }]);
    setUserChatInput('');

    // Bot Mascot automatic fun response in Portuguese
    setTimeout(() => {
      let botReply = '';
      if (selectedMascot.name === 'Echo Eagle') {
        botReply = `Excelente mensagem! "${userText}" foi anotado nos registros do servidor com as asas da vitória! 🦅`;
      } else if (selectedMascot.name === "Garrison's Angel") {
        botReply = `Que mensagem gentil! Como guardião do servidor, estou aqui para manter nosso ambiente seguro e animado! ✨`;
      } else {
        botReply = `Haha, gostei da atitude! Continue interagindo nos canais para desbloquear novas recompensas! 😈`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: selectedMascot.name,
          text: botReply,
          isBot: true,
        },
      ]);
    }, 700);
  };

  return (
    <>
      <div
        id="hero-ai-banner"
        className="relative overflow-hidden rounded-2xl bg-dark-900 p-4 sm:p-6 lg:p-8 border border-zinc-800 text-dark-100 shadow-md"
      >
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-800/90 border border-zinc-700 text-[11px] font-bold tracking-widest uppercase text-zinc-300 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span>CONVERSE. JOGUE. ENVOLVA.</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight font-display text-white">
              Seu Servidor com IA <br />
              <span className="text-zinc-300">As Mascotes Aguardam!</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 max-w-lg leading-relaxed">
              Dê vida ao seu Discord com assistentes virtuais inteligentes que interagem, celebram conquistas e aumentam o engajamento diário de todos os membros.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="hero-try-free-btn"
                onClick={() => setIsTryoutModalOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-extrabold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Bot className="w-4 h-4 text-zinc-950" />
                <span>EXPERIMENTE GRATUITAMENTE</span>
              </button>

              <button
                onClick={onOpenDirectImageModal}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 border border-zinc-700 text-zinc-200 hover:text-white font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Links de Imagens HTML</span>
              </button>
            </div>
          </div>

          {/* Right Floating Bot Chat Message Cards */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-3">
            {AI_MASCOTS.map((mascot, index) => (
              <div
                key={mascot.id}
                onClick={() => {
                  setSelectedMascot(mascot);
                  setIsTryoutModalOpen(true);
                }}
                className="p-3.5 sm:p-4 rounded-xl bg-dark-800/90 hover:bg-dark-800 border border-zinc-800 hover:border-zinc-700 transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-xs group"
              >
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={mascot.avatar}
                      alt={mascot.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-zinc-700 group-hover:ring-zinc-500 transition-all"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-dark-800" title="Online" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-xs sm:text-sm font-bold text-white group-hover:text-zinc-100 transition-colors truncate">
                          {mascot.name}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-dark-700 text-zinc-300 border border-zinc-700 tracking-wider shrink-0">
                          {mascot.tag}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-400 font-medium shrink-0">
                        Hoje às 14:2{index}
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed break-words">
                      {mascot.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Mascot Tryout Modal */}
      {isTryoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-dark-800 border border-dark-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-dark-700 bg-dark-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedMascot.avatar}
                  alt={selectedMascot.name}
                  className="w-10 h-10 rounded-full object-cover border border-dark-700"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-dark-100 font-display">
                      Conversar com {selectedMascot.name}
                    </h3>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-dark-700 text-dark-300 border border-dark-600">
                      BOT
                    </span>
                  </div>
                  <span className="text-xs text-dark-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-dark-300 inline-block" />
                    {selectedMascot.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Switch Mascot buttons */}
                <div className="flex items-center gap-1 mr-1 sm:mr-2 bg-dark-900 p-1 rounded-lg border border-zinc-700">
                  {AI_MASCOTS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMascot(m)}
                      className={`px-2 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                        m.id === selectedMascot.id
                          ? 'bg-zinc-700 text-white border border-zinc-600'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {m.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setIsTryoutModalOpen(false)}
                  className="text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-dark-700 transition-colors cursor-pointer"
                  title="Fechar modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1 bg-dark-default">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 ${
                    msg.isBot ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {msg.isBot && (
                    <img
                      src={selectedMascot.avatar}
                      alt={msg.sender}
                      className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                    />
                  )}
                  <div
                    className={`max-w-md p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.isBot
                        ? 'bg-dark-900 text-dark-200 border border-dark-700'
                        : 'bg-dark-700 text-dark-100 border border-dark-600 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 font-semibold text-xs opacity-75">
                      <span>{msg.sender}</span>
                      {msg.isBot && (
                        <span className="text-[9px] bg-dark-800 text-dark-300 border border-dark-700 px-1 py-0.2 rounded font-bold">
                          BOT
                        </span>
                      )}
                    </div>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 sm:p-4 bg-dark-900 border-t border-dark-700 flex items-center gap-2"
            >
              <input
                type="text"
                value={userChatInput}
                onChange={(e) => setUserChatInput(e.target.value)}
                placeholder={`Envie uma mensagem para ${selectedMascot.name}...`}
                className="flex-1 bg-dark-800 border border-dark-700 rounded-xl px-4 py-2.5 text-sm text-dark-100 placeholder-dark-400 focus:outline-none focus:border-dark-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-dark-100 hover:bg-white text-dark-default rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Enviar</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
