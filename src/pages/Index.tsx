import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [attendance, setAttendance] = useState('');
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [storyImages, setStoryImages] = useState<string[]>([]);

  const weddingDate = new Date('2026-06-19');
  const today = new Date();
  const daysUntil = Math.ceil((weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    if (!audioPlayed) {
      const audio = new Audio('https://cdn.poehali.dev/projects/5608e346-88f4-4056-bee7-c936c276531a/files/diamonds.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
      setAudioPlayed(true);
    }

    if (!envelopeOpened) {
      const timer = setTimeout(() => setEnvelopeOpened(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [envelopeOpened, audioPlayed]);

  useEffect(() => {
    if (currentSection === 6 || currentSection === 7) return;

    const autoScrollTimer = setTimeout(() => {
      if (currentSection < 5) {
        setCurrentSection(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 8000);

    return () => clearTimeout(autoScrollTimer);
  }, [currentSection]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...storyImages];
        newImages[index] = reader.result as string;
        setStoryImages(newImages);
        toast.success('Фото добавлено!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitAttendance = () => {
    if (attendance) {
      toast.success(attendance === 'yes' ? 'Спасибо! Мы будем рады видеть вас!' : 'Спасибо за ответ!');
      setTimeout(() => setCurrentSection(prev => prev + 1), 1500);
    }
  };

  const sections = [
    {
      id: 'cover',
      content: (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/5608e346-88f4-4056-bee7-c936c276531a/files/9e47b034-d70e-4eec-9387-ce0ae62ced5c.jpg)' }}
          />
          <div className="relative z-10 text-center animate-fade-in">
            <div className="mb-8">
              <Icon name="Heart" size={64} className="mx-auto text-primary animate-float" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-primary mb-6">
              Вячеслав & Сабрина
            </h1>
            <p className="text-2xl md:text-3xl text-foreground/80 mb-8">
              Приглашаем вас разделить с нами<br />самый счастливый день нашей жизни
            </p>
            <div className="text-xl md:text-2xl font-semibold text-primary mb-12">
              19 июня 2026
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 inline-block">
              <div className="text-lg text-foreground/70 mb-2">До торжества осталось</div>
              <div className="text-5xl font-bold text-primary">{daysUntil}</div>
              <div className="text-lg text-foreground/70 mt-2">
                {daysUntil === 1 ? 'день' : daysUntil < 5 ? 'дня' : 'дней'}
              </div>
            </div>
            <div className="mt-12">
              <Button 
                size="lg" 
                onClick={() => setCurrentSection(1)}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
              >
                Открыть приглашение
                <Icon name="ChevronDown" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'story',
      content: (
        <div className="min-h-screen flex items-center justify-center px-4 py-16">
          <Card className="max-w-4xl w-full p-8 md:p-12 animate-scale-in bg-white/95 backdrop-blur">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-8">
              Наша История
            </h2>
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg aspect-square flex items-center justify-center overflow-hidden group">
                  {storyImages[0] ? (
                    <img src={storyImages[0]} alt="История 1" className="w-full h-full object-cover" />
                  ) : (
                    <Icon name="Image" size={64} className="text-primary/40" />
                  )}
                  <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <div className="text-white text-center">
                      <Icon name="Upload" size={32} className="mx-auto mb-2" />
                      <span className="text-sm">Загрузить фото</span>
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 0)}
                    />
                  </label>
                </div>
                <div>
                  <p className="text-lg leading-relaxed text-foreground/80">
                    Наши пути пересеклись, и с того момента наша жизнь наполнилась любовью, 
                    смехом и незабываемыми моментами. Каждый день рядом друг с другом — это 
                    новая глава нашей прекрасной истории.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <p className="text-lg leading-relaxed text-foreground/80">
                    Мы прошли через многое вместе, поддерживая друг друга в каждом шаге. 
                    И теперь мы готовы начать новую главу нашей жизни, связав наши судьбы 
                    навсегда.
                  </p>
                </div>
                <div className="order-1 md:order-2 relative bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg aspect-square flex items-center justify-center overflow-hidden group">
                  {storyImages[1] ? (
                    <img src={storyImages[1]} alt="История 2" className="w-full h-full object-cover" />
                  ) : (
                    <Icon name="Image" size={64} className="text-primary/40" />
                  )}
                  <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <div className="text-white text-center">
                      <Icon name="Upload" size={32} className="mx-auto mb-2" />
                      <span className="text-sm">Загрузить фото</span>
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 1)}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Button 
                size="lg"
                onClick={() => setCurrentSection(2)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Далее
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'timeline',
      content: (
        <div className="min-h-screen flex items-center justify-center px-4 py-16">
          <Card className="max-w-3xl w-full p-8 md:p-12 animate-scale-in bg-white/95 backdrop-blur">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-12">
              Программа дня
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="text-2xl font-bold text-primary">14:00</div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="Users" size={24} className="text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">Сбор гостей</h3>
                  <p className="text-foreground/70">Встречаемся и готовимся к церемонии</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="text-2xl font-bold text-primary">15:00</div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="Heart" size={24} className="text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">Торжественная церемония</h3>
                  <p className="text-foreground/70">Официальная регистрация брака</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="text-2xl font-bold text-primary">17:00</div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="Utensils" size={24} className="text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">Начало банкета</h3>
                  <p className="text-foreground/70">Праздничный ужин и веселье</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="text-2xl font-bold text-primary">23:00</div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="Sparkles" size={24} className="text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">Окончание торжества</h3>
                  <p className="text-foreground/70">Прощание и благодарность</p>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Button 
                size="lg"
                onClick={() => setCurrentSection(3)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Далее
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'locations',
      content: (
        <div className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-5xl w-full space-y-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-12">
              Место проведения
            </h2>
            
            <Card className="p-6 md:p-8 bg-white/95 backdrop-blur">
              <div className="flex items-start gap-3 mb-4">
                <Icon name="MapPin" size={28} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Регистрация брака</h3>
                  <p className="text-lg text-foreground/80 mb-4">г. Воронеж, ул. Олеко Дундича, 23</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div 
                  className="rounded-lg overflow-hidden aspect-video bg-cover bg-center"
                  style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/5608e346-88f4-4056-bee7-c936c276531a/files/7d20a4a9-3b99-4ca0-81b5-2977e4cb201e.jpg)' }}
                />
                <div className="rounded-lg overflow-hidden aspect-video bg-muted flex items-center justify-center">
                  <a 
                    href="https://yandex.ru/maps/?text=г.Воронеж ул. Олеко Дундича, 23"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Icon name="MapPin" size={48} />
                    <span className="text-lg font-semibold">Открыть карту</span>
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-white/95 backdrop-blur">
              <div className="flex items-start gap-3 mb-4">
                <Icon name="Utensils" size={28} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Банкет</h3>
                  <p className="text-lg text-foreground/80 mb-4">г. Воронеж, наб. Максима Горького, 109/1</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div 
                  className="rounded-lg overflow-hidden aspect-video bg-cover bg-center"
                  style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/5608e346-88f4-4056-bee7-c936c276531a/files/34ad72c9-dad1-4f02-aae3-b12870d83f8d.jpg)' }}
                />
                <div className="rounded-lg overflow-hidden aspect-video bg-muted flex items-center justify-center">
                  <a 
                    href="https://yandex.ru/maps/?text=г.Воронеж наб. Максима Горького, 109/1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Icon name="MapPin" size={48} />
                    <span className="text-lg font-semibold">Открыть карту</span>
                  </a>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <Button 
                size="lg"
                onClick={() => setCurrentSection(4)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Далее
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'calendar',
      content: (
        <div className="min-h-screen flex items-center justify-center px-4 py-16">
          <Card className="max-w-2xl w-full p-8 md:p-12 animate-scale-in bg-white/95 backdrop-blur">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-8">
              Июнь 2026
            </h2>
            <div className="grid grid-cols-7 gap-2 mb-8">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                <div key={day} className="text-center font-semibold text-foreground/70 py-2">
                  {day}
                </div>
              ))}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((day) => (
                <div key={day} className="relative aspect-square flex items-center justify-center">
                  {day === 19 ? (
                    <div className="relative">
                      <Icon name="Heart" size={48} className="text-primary absolute inset-0 -m-3" />
                      <span className="relative z-10 text-xl font-bold text-white">{day}</span>
                    </div>
                  ) : (
                    <span className="text-lg text-foreground/70">{day}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center text-xl text-foreground/80 mb-8">
              Пятница, 19 июня 2026
            </div>
            <div className="text-center">
              <Button 
                size="lg"
                onClick={() => setCurrentSection(5)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Далее
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'message',
      content: (
        <div className="min-h-screen flex items-center justify-center px-4 py-16">
          <Card className="max-w-2xl w-full p-8 md:p-12 animate-scale-in bg-white/95 backdrop-blur">
            <div className="text-center mb-8">
              <Icon name="Heart" size={64} className="mx-auto text-primary mb-6 animate-float" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Дорогие гости!
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-center text-foreground/80 mb-8">
              Для нас очень важно, чтобы в этот особенный день рядом были самые близкие 
              и дорогие нам люди. Ваше присутствие сделает наш праздник по-настоящему 
              незабываемым. Мы будем невероятно рады разделить с вами радость и счастье 
              этого волшебного момента!
            </p>
            <div className="text-center text-xl italic text-primary/80">
              С любовью,<br />
              Вячеслав и Сабрина
            </div>
            <div className="mt-12 text-center">
              <Button 
                size="lg"
                onClick={() => setCurrentSection(6)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Далее
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'rsvp',
      content: (
        <div className="min-h-screen flex items-center justify-center px-4 py-16">
          <Card className="max-w-xl w-full p-8 md:p-12 animate-scale-in bg-white/95 backdrop-blur">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
              Подтверждение присутствия
            </h2>
            <p className="text-center text-foreground/80 mb-8">
              Пожалуйста, подтвердите своё присутствие на нашей свадьбе
            </p>
            <RadioGroup value={attendance} onValueChange={setAttendance} className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 border-2 border-primary/20 rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="flex-1 cursor-pointer text-lg">
                  Да, с удовольствием приду!
                </Label>
                <Icon name="Check" size={24} className="text-primary" />
              </div>
              <div className="flex items-center space-x-3 border-2 border-primary/20 rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="flex-1 cursor-pointer text-lg">
                  К сожалению, не смогу присутствовать
                </Label>
                <Icon name="X" size={24} className="text-foreground/40" />
              </div>
            </RadioGroup>
            <div className="text-center">
              <Button 
                size="lg"
                onClick={handleSubmitAttendance}
                disabled={!attendance}
                className="bg-primary hover:bg-primary/90 text-white w-full"
              >
                Отправить ответ
                <Icon name="Send" size={20} className="ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'thankyou',
      content: (
        <div className="min-h-screen flex items-center justify-center px-4 py-16">
          <Card className="max-w-2xl w-full p-8 md:p-12 animate-scale-in bg-white/95 backdrop-blur text-center">
            <Icon name="Heart" size={80} className="mx-auto text-primary mb-8 animate-float" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Спасибо!
            </h2>
            <p className="text-xl leading-relaxed text-foreground/80 mb-8">
              {attendance === 'yes' 
                ? 'Мы невероятно рады, что вы разделите с нами этот особенный день! До встречи на нашей свадьбе!'
                : 'Благодарим за ответ! Мы будем скучать по вам в этот особенный день.'}
            </p>
            <div className="text-2xl italic text-primary/80 mb-8">
              С любовью и благодарностью,<br />
              Вячеслав & Сабрина
            </div>
            <div className="flex justify-center gap-4 text-primary">
              <Icon name="Heart" size={32} className="animate-float" style={{ animationDelay: '0s' }} />
              <Icon name="Heart" size={32} className="animate-float" style={{ animationDelay: '0.5s' }} />
              <Icon name="Heart" size={32} className="animate-float" style={{ animationDelay: '1s' }} />
            </div>
          </Card>
        </div>
      )
    }
  ];

  if (!envelopeOpened) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary to-background">
        <div className="text-center animate-scale-in">
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-primary/20 rounded-lg animate-pulse" />
            <Icon name="Mail" size={80} className="absolute inset-0 m-auto text-primary" />
          </div>
          <p className="text-2xl text-foreground/80">Открываем приглашение...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-background via-secondary to-background">
      {sections[currentSection].content}
    </div>
  );
};

export default Index;