import * as React from "react"
import Svg, { Path} from "react-native-svg"

interface Props {
  size?: number
}

const CatchIcon = ({ size=24 }: Props) => (
  <Svg
    width={24}
    height={21}
    style={{ transform: [{ scale: size/24 }]}}
  >
    <Path fill="#000" d="M13.305 3.908a.388.388 0 0 0-.08.542 2.76 2.76 0 0 1 .512 2.039 2.76 2.76 0 0 1-1.083 1.8.388.388 0 0 0 .46.625 3.539 3.539 0 0 0 1.39-2.31 3.54 3.54 0 0 0-.656-2.616.388.388 0 0 0-.543-.08ZM20.153 6.513l-.002-.026-.002-.013a.334.334 0 0 0-.005-.024c0-.005-.001-.01-.003-.014-.001-.008-.004-.014-.006-.021l-.005-.016-.008-.02-.006-.014-.012-.024-.005-.009a.387.387 0 0 0-.269-.183h-.002l-.007-.002a7.758 7.758 0 0 0-4.696.78l-.004.003-.018.01-.017.011-.004.002-.01.008-.017.014-.013.01-.015.016a.251.251 0 0 0-.012.013L15 7.029a.25.25 0 0 0-.011.015l-.01.015a.422.422 0 0 0-.02.032l-.009.019-.007.015a.485.485 0 0 0-.007.019l-.005.016a.425.425 0 0 0-.01.037l-.002.018-.003.019-.001.017v.02a.336.336 0 0 0 0 .037l.003.019.003.018a.237.237 0 0 0 .009.037.589.589 0 0 0 .007.021l.005.015.01.022a.175.175 0 0 0 .005.01l.003.005.005.01a.862.862 0 0 0 .018.028c.212.308.275.69.173 1.05l-.001.007a.298.298 0 0 0-.005.023l-.003.017-.003.019-.001.02v.053a.29.29 0 0 0 .003.023l.003.015a.255.255 0 0 0 .004.02l.005.018.006.017.007.02a.21.21 0 0 0 .016.034l.007.014.012.018.009.014.012.015.013.016.01.011a.225.225 0 0 0 .018.017l.005.005a5.544 5.544 0 0 0 3.676 1.413h.074l.02-.002a.4.4 0 0 0 .038-.005l.018-.003a.4.4 0 0 0 .037-.01l.019-.007.017-.006.017-.009.016-.008.016-.01.016-.01.015-.011a.238.238 0 0 0 .014-.012l.014-.012.014-.013.012-.014.012-.014.011-.015a.46.46 0 0 0 .011-.015l.01-.016.009-.016.008-.017.008-.017.006-.019c.002-.006.005-.011.006-.017l.005-.02.004-.017.003-.021.003-.018v-.021l.001-.017v-.022c-.004-.197-.007-.368.043-.517.029-.088.072-.178.116-.273.078-.163.166-.349.207-.57.015-.084.026-.166.037-.245.018-.137.035-.265.071-.376.022-.067.049-.134.077-.206.052-.132.112-.28.146-.448.048-.23.065-.48.053-.786v-.003l-.001-.001Zm-.777.36a1.943 1.943 0 0 1-.034.271 1.995 1.995 0 0 1-.108.318c-.032.08-.065.163-.094.254a2.855 2.855 0 0 0-.102.511c-.01.074-.02.143-.032.21-.022.12-.078.24-.144.377a3.169 3.169 0 0 0-.152.36 1.648 1.648 0 0 0-.076.391 4.77 4.77 0 0 1-2.677-1.063c.014-.093.022-.187.023-.28a3.97 3.97 0 0 1 .845.022.31.31 0 1 0 .082-.614 4.58 4.58 0 0 0-1.018-.023 1.956 1.956 0 0 0-.055-.16 6.975 6.975 0 0 1 3.542-.573Z" />
    <Path fill="#000" d="M24 6.093v-.038l-.002-.017a.316.316 0 0 0-.003-.02c0-.006-.002-.012-.004-.018a.243.243 0 0 0-.004-.02l-.006-.018-.006-.018-.008-.02-.007-.014-.012-.022c-.002-.003-.003-.007-.006-.01-.093-.153-.181-.307-.274-.47-.197-.346-.4-.704-.66-1.033a3.151 3.151 0 0 0-.707-.67 2.184 2.184 0 0 0-.378-.191c-.125-.053-.267-.113-.316-.175-.032-.04-.052-.143-.072-.242a3.052 3.052 0 0 0-.037-.176 1.442 1.442 0 0 0-.979-1.023 3.235 3.235 0 0 0-.674-.155 1.866 1.866 0 0 0-1.043-.33h-.02c-.817 0-1.601.334-2.17.908a7.912 7.912 0 0 0-1.514-.174c-2.364-.042-4.854.186-7.61.696l-.093.017-.239.044c-.226.033-.449.097-.66.195l-.008.004c-.002.002-.004.002-.007.003-.397.2-.69.56-.805.988-.09.333-.056.695.09 1.037l-.276.045c-.518.076-1.053.13-1.401-.115-.088-.063-.203-.189-.179-.569.011-.182.035-.365.06-.559.06-.454.122-.925.017-1.413-.083-.383-.315-.756-.66-1.07A.895.895 0 0 0 1.842.555C1.412.37.972.215.542.064L.415.018a.31.31 0 1 0-.207.584l.13.046c.41.145.832.294 1.238.466a.898.898 0 0 0 1.38.835c.223.216.375.464.427.701.082.383.03.781-.025 1.202-.025.196-.052.397-.065.601-.032.51.117.886.44 1.114.325.229.716.293 1.08.293.288 0 .56-.04.77-.071.144-.022.288-.046.432-.071.046.199.06.418.038.648a1.211 1.211 0 0 0 .294 1.997h.002l.003.002c1.69.773 3.202 1.375 4.625 1.842.342.112.683.217 1.022.316-.31.467-.767.825-1.3 1.004a45.779 45.779 0 0 1-3.395-.044h-.001a3.541 3.541 0 0 0-2.64.933 1.012 1.012 0 0 0-.229 1.18v.001l.524 1.102c.292.671.78 1.23 1.415 1.62a.601.601 0 0 1 .207.254l.006.015.003.008c.182.395.258.736.23 1.043v.014l-.002.013c-.035.91.389 1.76 1.132 2.277l.012.008a1.011 1.011 0 0 0 .872.128c.984-.308 2.334-1.055 2.9-2.147l.003-.005.004-.007c.242-.497.691-1.074 1.154-1.485a16.701 16.701 0 0 1 1.584-.74 5.21 5.21 0 0 1 1.069-.314h.003a12.845 12.845 0 0 0 4.321-1.548h.001l.003-.002h.001a5.456 5.456 0 0 0 2.308-6.935v-.002l-.001-.003a7.648 7.648 0 0 0-.159-.344 4.287 4.287 0 0 1 1.539-.08h.007a.405.405 0 0 0 .038.003h.005l.027-.001h.007a.401.401 0 0 0 .037-.006l.029-.007.008-.002a.31.31 0 0 0 .027-.009l.01-.004a.306.306 0 0 0 .021-.01l.01-.004a.333.333 0 0 0 .052-.033l.008-.005.018-.015a.37.37 0 0 0 .034-.033c0-.002.002-.002.003-.003l.016-.02.007-.01a.603.603 0 0 0 .012-.018l.009-.014.007-.014.01-.02.004-.01a.388.388 0 0 0 .02-.06l.002-.01.005-.029v-.001l.001-.01.002-.027.002-.002ZM2.191 1.197c0-.045.011-.088.03-.126l.004-.006v-.002a.277.277 0 1 1-.034.133Zm4.924 4.849a2.907 2.907 0 0 0-.065-.531c.166-.034.335-.068.501-.1a.31.31 0 0 0-.117-.61c-.197.038-.397.08-.59.119a2.547 2.547 0 0 0-.065-.122c-.05-.09-.129-.264-.083-.434a.502.502 0 0 1 .253-.315 1.325 1.325 0 0 1 .37-.106c.006 0 .013-.002.02-.004.317-.039.646.034.92.213.389.256.624.704.613 1.17v.02c.003.268.043.527.117.774a13.611 13.611 0 0 0-1.873-.074Zm1.421 13.02a1.587 1.587 0 0 1-.665-1.357c.038-.486-.067-.993-.322-1.548a1.666 1.666 0 0 0-.558-.697l-.003-.002a.097.097 0 0 0-.006-.005l-.02-.012-.017-.012a2.506 2.506 0 0 1-1.026-1.166l-.004-.01-.005-.01-.511-1.076a2.483 2.483 0 0 1 1.837-.636h.011c.725.04 1.498.06 2.31.06h.035a2.97 2.97 0 0 0-.156.52c-.7-.121-1.421-.091-2.113.09a.31.31 0 1 0 .159.6 4.353 4.353 0 0 1 1.89-.072c0 .337.052.674.16.987a7.842 7.842 0 0 0-1.556.4.31.31 0 1 0 .215.583 7.291 7.291 0 0 1 1.625-.396c.16.25.353.472.574.661-.311.344-.685.629-1.101.836a.31.31 0 1 0 .277.555c.51-.255.966-.609 1.34-1.038.151.082.31.15.476.204-.234.304-.436.62-.584.921-.331.64-1.26 1.304-2.262 1.622v-.001Zm10.817-6.152-.002.001-.002.002a11.794 11.794 0 0 1-3.972 1.423h-.001c-.39.063-.837.193-1.292.376-.564.227-1.133.494-1.74.817l-.003.002a.198.198 0 0 0-.013.007l-.004.002a.43.43 0 0 1-.283.055 1.884 1.884 0 0 1-1.448-1.064c-.256-.541-.217-1.274.094-1.782v-.001a.446.446 0 0 1 .263-.2h.006a3.597 3.597 0 0 0 2.092-1.736c.587.155 1.15.294 1.67.418a.527.527 0 1 0 .245-1.025 62.435 62.435 0 0 1-2.093-.534 34.88 34.88 0 0 1-1.566-.47c-1.384-.454-2.86-1.041-4.51-1.796a.157.157 0 0 1 .058-.298c1.164-.06 2.305.037 3.39.287a.524.524 0 0 0 .632-.395.527.527 0 0 0-.395-.632 13.368 13.368 0 0 0-.227-.05 1.674 1.674 0 0 1-.328-.99c.01-.64-.24-1.259-.678-1.714 2.074-.311 3.994-.448 5.832-.415a6.817 6.817 0 0 1 6.136 4.107v.002l.001.001a4.39 4.39 0 0 1-1.864 5.602h.002Zm-.012-9.439a7.865 7.865 0 0 0-1.82-.902c.369-.247.809-.384 1.262-.384h.015c.241.002.478.086.667.236l.011.008.013.01.018.011.012.007a.354.354 0 0 0 .099.038l.012.003.024.004.012.001.027.002h.007c.135.003.33.046.579.127.243.08.41.248.467.476.01.04.02.085.028.133.034.174.076.39.228.58.172.214.409.314.618.403.096.04.188.08.248.12.187.126.36.292.53.508.194.245.355.515.519.8a5.02 5.02 0 0 0-1.281.19 7.825 7.825 0 0 0-2.296-2.37h.001Z" />
    <Path fill="#000" d="M11.781 3.902c-.022-.089-.1-.15-.24-.19a1.085 1.085 0 0 0-.353-.033 1.563 1.563 0 0 0-.698.215c-.076.051-.164.123-.167.219-.003.078.054.147.16.193a.87.87 0 0 0 .35.064c.049 0 .102-.003.157-.009.234-.024.477-.069.662-.226.053-.045.152-.129.13-.233Z" />
  </Svg>
)

export default CatchIcon