using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Threading;

namespace DongHoDienTu
{
    /// <summary>
    /// Interaction logic for Timer.xaml
    /// </summary>
    public partial class Timer : UserControl
    {
        public static Timer obiectul = null;
        DispatcherTimer dispatcherTimer = new DispatcherTimer();
        bool check;
        int number1 = 0;
        int number2 = 0;
        int number3 = 0;
        int number4 = 0;
        string[] img = { "0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png" };

        public int Second
        {
            get { return number3 * 10 + number4; }
            set { number3 = value / 10; number4 = value % 10; }
        }
        public int minute
        {
            get { return number1 * 10 + number2; }
            set { number1 = value / 10; number2 = value % 10; }
        }
        public static Timer getUserCOntrol()
        {
            if (obiectul != null)
            {
                return obiectul;
            }
            else
            {
                obiectul = new Timer();
                return obiectul;
            }
        }


        public Timer()
        {

            InitializeComponent();
            dispatcherTimer.Tick += dispatcherTimer_Tick;
            dispatcherTimer.Interval = new TimeSpan(0, 0, 1);
            dispatcherTimer.Start();
            obiectul = this;
            

        }

        private void dispatcherTimer_Tick(object sender, EventArgs e)
        {
            if (check == true)
            {
                if (Second == 59)
                {
                    Second = 0;
                    minute++;
                }
                else
                {
                    Second++;
                }
            }

            imgNumber1.Source = new BitmapImage(new Uri("img/" + img[number1],
                    UriKind.RelativeOrAbsolute));
            imgNumber2.Source = new BitmapImage(new Uri("img/" + img[number2],
                   UriKind.RelativeOrAbsolute));
            imgNumber3.Source = new BitmapImage(new Uri("img/" + img[number3],
                   UriKind.RelativeOrAbsolute));
            imgNumber4.Source = new BitmapImage(new Uri("img/" + img[number4],
                   UriKind.RelativeOrAbsolute));

        }

        public void Start()
        {
            check = true;
        }

        public void Pause()
        {
            check = false;
        }

        public void Stop()
        {
            check = false;
            Second = 0;
            minute = 0;
        }

        public void Resume()
        {
            check = true;
        }
    }
}
