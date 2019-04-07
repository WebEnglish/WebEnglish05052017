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

namespace DongHoDienTu
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        Timer object1;

        public MainWindow()
        {
            InitializeComponent();
            object1 = Timer.getUserCOntrol();
            stop.IsEnabled = false;
            pause.IsEnabled = false;
            resume.IsEnabled = false;
        }
        private void btnStart(object sender, RoutedEventArgs e)
        {
            object1.Start();
            start.IsEnabled = false;
            resume.IsEnabled = false;
            pause.IsEnabled = true;
            stop.IsEnabled = true;

        }

        private void btnStop(object sender, RoutedEventArgs e)
        {
            object1.Stop();
            start.IsEnabled = true;
            resume.IsEnabled = false;
            pause.IsEnabled = false;
            stop.IsEnabled = false;

        }

        private void btnPause(object sender, RoutedEventArgs e)
        {
            object1.Pause();
            start.IsEnabled = false;
            resume.IsEnabled = true;
            pause.IsEnabled = false;
            stop.IsEnabled = true;
        }

        private void btnResume(object sender, RoutedEventArgs e)
        {
            object1.Resume();
            start.IsEnabled = false;
            resume.IsEnabled = false;
            pause.IsEnabled = true;
            stop.IsEnabled = true;

        }


    }
}
