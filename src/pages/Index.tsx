import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const services = [
  {
    id: 1,
    name: 'Наращивание ресниц',
    description: 'Классическое, 2D, 3D объемное наращивание',
    price: 'от 2500₽',
    duration: '2-3 часа',
    image: 'https://cdn.poehali.dev/projects/a5b34899-3728-4b50-aacc-a0a64938b8b7/files/54d13eec-078b-4576-a6b1-df50465d0e48.jpg'
  },
  {
    id: 2,
    name: 'Ламинирование ресниц',
    description: 'Придаем изгиб и объем натуральным ресницам',
    price: 'от 1800₽',
    duration: '1-1.5 часа',
    image: 'https://cdn.poehali.dev/projects/a5b34899-3728-4b50-aacc-a0a64938b8b7/files/54d13eec-078b-4576-a6b1-df50465d0e48.jpg'
  },
  {
    id: 3,
    name: 'Оформление бровей',
    description: 'Коррекция, окрашивание, архитектура бровей',
    price: 'от 1200₽',
    duration: '45 мин - 1 час',
    image: 'https://cdn.poehali.dev/projects/a5b34899-3728-4b50-aacc-a0a64938b8b7/files/76a34f74-2523-4f37-85a2-957236a03962.jpg'
  }
];

const portfolio = [
  { id: 1, category: 'lashes', image: 'https://cdn.poehali.dev/projects/a5b34899-3728-4b50-aacc-a0a64938b8b7/files/54d13eec-078b-4576-a6b1-df50465d0e48.jpg' },
  { id: 2, category: 'brows', image: 'https://cdn.poehali.dev/projects/a5b34899-3728-4b50-aacc-a0a64938b8b7/files/76a34f74-2523-4f37-85a2-957236a03962.jpg' },
  { id: 3, category: 'lashes', image: 'https://cdn.poehali.dev/projects/a5b34899-3728-4b50-aacc-a0a64938b8b7/files/54d13eec-078b-4576-a6b1-df50465d0e48.jpg' },
  { id: 4, category: 'brows', image: 'https://cdn.poehali.dev/projects/a5b34899-3728-4b50-aacc-a0a64938b8b7/files/76a34f74-2523-4f37-85a2-957236a03962.jpg' },
  { id: 5, category: 'lashes', image: 'https://cdn.poehali.dev/projects/a5b34899-3728-4b50-aacc-a0a64938b8b7/files/54d13eec-078b-4576-a6b1-df50465d0e48.jpg' },
  { id: 6, category: 'brows', image: 'https://cdn.poehali.dev/projects/a5b34899-3728-4b50-aacc-a0a64938b8b7/files/76a34f74-2523-4f37-85a2-957236a03962.jpg' }
];

const reviews = [
  { id: 1, name: 'Анна', text: 'Прекрасный мастер! Ресницы держатся больше месяца, выглядят естественно. Очень довольна!', rating: 5 },
  { id: 2, name: 'Мария', text: 'Делаю брови только здесь. Всегда идеальный результат, внимательное отношение.', rating: 5 },
  { id: 3, name: 'Елена', text: 'Ламинирование ресниц превзошло ожидания! Профессионально, аккуратно, быстро.', rating: 5 }
];

const masters = [
  { id: 1, name: 'Анастасия', specialization: 'Lash-мастер' },
  { id: 2, name: 'Виктория', specialization: 'Brow-мастер' }
];

const timeSlots = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00'];

const Index = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bookingData, setBookingData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    service: '',
    master: '',
    date: undefined as Date | undefined,
    time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredPortfolio = selectedCategory === 'all' 
    ? portfolio 
    : portfolio.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-card/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">Lash Studio 54</h1>
          <div className="hidden md:flex gap-6">
            <a href="#home" className="hover:text-primary transition-colors">Главная</a>
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#price" className="hover:text-primary transition-colors">Прайс</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Портфолио</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
            <a href="#booking" className="hover:text-primary transition-colors">Запись</a>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-24 pb-16 px-4 animate-fade-in">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                Ваша естественная красота
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Профессиональное наращивание ресниц, ламинирование и оформление бровей. 
                Опыт работы 6 лет.
              </p>
              <div className="flex gap-4">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="animate-scale-in">
                      Записаться онлайн
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Онлайн-запись</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Ваше имя</label>
                        <Input
                          placeholder="Введите ваше имя"
                          value={bookingData.clientName}
                          onChange={(e) => setBookingData({...bookingData, clientName: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Телефон</label>
                        <Input
                          placeholder="+7 (999) 123-45-67"
                          value={bookingData.clientPhone}
                          onChange={(e) => setBookingData({...bookingData, clientPhone: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email (необязательно)</label>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          value={bookingData.clientEmail}
                          onChange={(e) => setBookingData({...bookingData, clientEmail: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Выберите услугу</label>
                        <Select onValueChange={(value) => setBookingData({...bookingData, service: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите услугу" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map(service => (
                              <SelectItem key={service.id} value={service.name}>
                                {service.name} - {service.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Выберите мастера</label>
                        <Select onValueChange={(value) => setBookingData({...bookingData, master: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите мастера" />
                          </SelectTrigger>
                          <SelectContent>
                            {masters.map(master => (
                              <SelectItem key={master.id} value={master.name}>
                                {master.name} - {master.specialization}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Выберите дату</label>
                        <Calendar
                          mode="single"
                          selected={bookingData.date}
                          onSelect={(date) => setBookingData({...bookingData, date})}
                          className="rounded-md border"
                          disabled={(date) => date < new Date()}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Выберите время</label>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map(time => (
                            <Button
                              key={time}
                              variant={bookingData.time === time ? "default" : "outline"}
                              onClick={() => setBookingData({...bookingData, time})}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Button 
                        className="w-full" 
                        size="lg"
                        disabled={isSubmitting}
                        onClick={async () => {
                          if (!bookingData.clientName || !bookingData.clientPhone || !bookingData.service || !bookingData.master || !bookingData.date || !bookingData.time) {
                            toast({
                              title: "Ошибка",
                              description: "Пожалуйста, заполните все обязательные поля",
                              variant: "destructive"
                            });
                            return;
                          }

                          setIsSubmitting(true);

                          try {
                            const response = await fetch('https://functions.poehali.dev/f38d8825-bc67-4e4a-a931-f4d979a45c4c', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                clientName: bookingData.clientName,
                                clientPhone: bookingData.clientPhone,
                                clientEmail: bookingData.clientEmail,
                                service: bookingData.service,
                                master: bookingData.master,
                                date: bookingData.date.toISOString().split('T')[0],
                                time: bookingData.time
                              })
                            });

                            const data = await response.json();

                            if (data.success) {
                              toast({
                                title: "Успешно!",
                                description: "Ваша запись создана. Мы свяжемся с вами для подтверждения."
                              });
                              setBookingData({
                                clientName: '',
                                clientPhone: '',
                                clientEmail: '',
                                service: '',
                                master: '',
                                date: undefined,
                                time: ''
                              });
                              setDialogOpen(false);
                            } else {
                              toast({
                                title: "Ошибка",
                                description: "Не удалось создать запись. Попробуйте позже.",
                                variant: "destructive"
                              });
                            }
                          } catch (error) {
                            toast({
                              title: "Ошибка",
                              description: "Не удалось отправить запрос. Проверьте подключение.",
                              variant: "destructive"
                            });
                          } finally {
                            setIsSubmitting(false);
                          }
                        }}
                      >
                        {isSubmitting ? 'Отправка...' : 'Подтвердить запись'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="lg">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Позвонить
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/a5b34899-3728-4b50-aacc-a0a64938b8b7/files/cad9a3aa-27b1-4f05-a21b-5a62703a6e6c.jpg"
                alt="Студия красоты"
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">{service.price}</p>
                      <p className="text-sm text-muted-foreground">{service.duration}</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Записаться</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">Запись на {service.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Выберите мастера</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите мастера" />
                              </SelectTrigger>
                              <SelectContent>
                                {masters.map(master => (
                                  <SelectItem key={master.id} value={master.name}>
                                    {master.name} - {master.specialization}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Выберите дату и время</label>
                            <Calendar
                              mode="single"
                              className="rounded-md border"
                              disabled={(date) => date < new Date()}
                            />
                          </div>
                          <Button className="w-full" size="lg">
                            Подтвердить запись
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="price" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Прайс-лист</h2>
          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                {services.map(service => (
                  <div key={service.id} className="flex justify-between items-start border-b pb-4 last:border-b-0">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{service.name}</h3>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <Icon name="Clock" size={14} className="inline mr-1" />
                        {service.duration}
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-primary">{service.price}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="portfolio" className="py-16 px-4 bg-accent/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Наши работы</h2>
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
            >
              Все работы
            </Button>
            <Button 
              variant={selectedCategory === 'lashes' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('lashes')}
            >
              Ресницы
            </Button>
            <Button 
              variant={selectedCategory === 'brows' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('brows')}
            >
              Брови
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredPortfolio.map((item, index) => (
              <div 
                key={item.id} 
                className="relative overflow-hidden rounded-2xl aspect-square group animate-scale-in"
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <img 
                  src={item.image}
                  alt="Portfolio"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <Badge variant="secondary">
                    {item.category === 'lashes' ? 'Ресницы' : 'Брови'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Отзывы клиентов</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={review.id} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">{review.text}</p>
                  <p className="font-semibold">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-16 px-4 bg-primary/10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Готовы преобразиться?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Запишитесь на процедуру прямо сейчас и получите скидку 10% на первое посещение
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="text-lg px-8">
                Записаться сейчас
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl">Онлайн-запись</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Выберите услугу</label>
                  <Select onValueChange={(value) => setBookingData({...bookingData, service: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service.id} value={service.name}>
                          {service.name} - {service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Выберите мастера</label>
                  <Select onValueChange={(value) => setBookingData({...bookingData, master: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите мастера" />
                    </SelectTrigger>
                    <SelectContent>
                      {masters.map(master => (
                        <SelectItem key={master.id} value={master.name}>
                          {master.name} - {master.specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Выберите дату</label>
                  <Calendar
                    mode="single"
                    selected={bookingData.date}
                    onSelect={(date) => setBookingData({...bookingData, date})}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Выберите время</label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map(time => (
                      <Button
                        key={time}
                        variant={bookingData.time === time ? "default" : "outline"}
                        onClick={() => setBookingData({...bookingData, time})}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Подтвердить запись
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Студия Красоты</h3>
              <p className="text-muted-foreground">
                Профессиональный уход за вашей красотой. Опыт работы 6 лет.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Контакты</h3>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  +7 (999) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  info@beauty-studio.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} />
                  Москва, ул. Примерная, 1
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Режим работы</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Пн-Пт: 10:00 - 21:00</p>
                <p>Сб-Вс: 11:00 - 19:00</p>
              </div>
            </div>
          </div>
          <div className="text-center text-muted-foreground border-t pt-8">
            <p>&copy; 2024 Студия Красоты. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;