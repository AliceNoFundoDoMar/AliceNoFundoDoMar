// Seleciona o elemento canvas no HTML e cria um contexto 2D para desenhar
const canvas = document.getElementById('bolhas'); 
const ctx = canvas.getContext('2d');

// Define a largura e a altura do canvas para ocupar toda a janela do navegador
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array que armazenará todas as bolhas criadas
const bolhas = [];

// Função para criar uma bolha com suas propriedades e métodos
function criarBolha(x, y, radius, velocidade) {
  return {
    x: x, // Coordenada horizontal da bolha
    y: y, // Coordenada vertical da bolha
    radius: radius, // Raio (tamanho) da bolha
    velocidade: velocidade, // Velocidade de subida da bolha

    // Método para desenhar a bolha no canvas
    draw: function() {
        ctx.beginPath(); // Inicia um novo caminho para desenhar
      
        // Cria um gradiente radial para a bolha
        const gradient = ctx.createRadialGradient(
          this.x, this.y, this.radius * 0.1,  // Ponto inicial do gradiente (mais brilhante)
          this.x, this.y, this.radius         // Ponto final do gradiente (mais escuro)
        );
      
        // Define as cores do gradiente, indo do centro para a borda
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');  // Brilhante no centro (branco com 80% de opacidade)
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)'); // Gradualmente menos opaco
        gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');   // Transparente na borda
      
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Desenha um círculo completo
        ctx.fillStyle = gradient; // Define o estilo de preenchimento com o gradiente
        ctx.fill(); // Preenche o círculo com o gradiente
        ctx.closePath(); // Fecha o caminho de desenho
      },
      

    // Método para atualizar a posição da bolha e redesenhá-la
    update: function() {
      this.y -= this.velocidade; // Move a bolha para cima, subtraindo a velocidade da coordenada y
      if (this.y + this.radius < 0) { // Se a bolha sair da tela (parte superior)
        this.y = canvas.height + this.radius; // Reposiciona a bolha na parte inferior da tela
      }
      this.draw(); // Redesenha a bolha na nova posição
    }
  };
}

// Função para gerar várias bolhas com propriedades aleatórias
function gerarBolhas() {
  for (let i = 0; i < 50; i++) { // Loop que cria 100 bolhas
    const x = Math.random() * canvas.width; // Posição horizontal aleatória no canvas
    const y = Math.random() * canvas.height; // Posição vertical aleatória no canvas
    const radius = Math.random() * 20 + 2; // Tamanho aleatório da bolha (raio entre 2 e 7)
    const velocidade = Math.random() * 1 + 0.5; // Velocidade aleatória da bolha (entre 0.5 e 1.5)
    bolhas.push(criarBolha(x, y, radius, velocidade)); // Adiciona a bolha criada ao array de bolhas
  }
}

// Função para animar as bolhas
function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas para evitar rastros das bolhas
  bolhas.forEach(bolha => bolha.update()); // Atualiza e desenha cada bolha no array de bolhas
  requestAnimationFrame(animar); // Requisita o próximo frame de animação, criando um loop contínuo
}

// Inicializa as bolhas e inicia a animação
gerarBolhas(); // Cria todas as bolhas
animar(); // Inicia a animação

// Adiciona um evento para ajustar o tamanho do canvas se a janela do navegador for redimensionada
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth; // Ajusta a largura do canvas para a nova largura da janela
  canvas.height = window.innerHeight; // Ajusta a altura do canvas para a nova altura da janela
});

document.addEventListener('DOMContentLoaded', () => {
  const titulo = document.querySelector('.titulo');


  // Animação do título
  titulo.classList.add('titulo-animation');

});
