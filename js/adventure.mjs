
/**
 * Override which attributes of an Actor should be kept from the exported adventure data rather than imported from
 * the source compendium.
 */
const ACTOR_IMPORT_OVERRIDES = {
  "u36SRb3lyB4beHCN": ["data"], 		// Lasda Venkervale
  "HBRz8BVLVN9u9Odp": ["items"], 		// Corpselight
  "16QZlbWdacKmlMdj": ["items"], 		// Graveyard Skeleton
  "0lcAjFN7Qw8NxJQc": ["items"], 		// Shadow Spawn
  "GsrqCDf0Dc9PisEt": ["data"], 		// Violet Fungus
  "oSQ3Q9tzTohksAtf": ["data"], 		// Crawling Hand
  "rdvEcP7fUxYSKxcT": ["data", "items"], // Barbazu Vanguard
  "pFPLCspUfJ2FUMcj": ["data"],			// Falxi Orshendiel
  "yl5GMSnTO8S2ei72": ["items"], 		// Tavern Morlock
  "A4MusxxoLxwMVZua": ["items"], 		// Barbazu Drill Sergeant
  "GoGNtiHuYycppLPk": ["data"], 		// Cynemi
  "vX4SBXIICKfrM4pF": ["items"],        // Hellforge Barbazu
  "hIWzgjW2E2K6ImPA": ["data"], 		// Child of Belcorra
  "RFCxaIS4OkacCpxD": ["data"], 		// Bog-rotted Froghemoth
  "kkFVngQUGTACeggf": ["items"],		// Murmur
  "cgXsxjMhMJ42L4oq": ["items"], 		// Nyzuros
  "H4z469asuR2sjRWY": ["items"],		// Urthagal
  "4p07SH4zdmVZ405I": ["items"],		// Caliddo Haruvex
  "JrowrtDilEG8dN2s": ["items"],		// Quara Orshendiel
  "bif3iQcDPi27rx6x": ["items"],		// Salaisa Malthulas
  "BOaM3pAuWl06Q6IZ": ["items"],		// Cult Specter
  "QnbMaJPU7jG4uhaC": ["data"], 		// Soul Feeder
}

// Abomination Vaults
const ABOMINATION_VAULTS = {
  slug: "abomination-vaults",
  title: "Abomination Vaults",
  actorOverrides: ACTOR_IMPORT_OVERRIDES,
  importOptions: {
    enhancedMaps: {
      label: "Use Enhanced Maps",
      default: true,
      sceneIds: {
        original: ['MSHO9s465zhZIuH7', '2dHU2g8WUOc4NZlq', 'TE8aNKdE5NKGSgoV', 'l9piQKpfF80Tf4Ee', 'D3ZsHuxFbD9XJ8xm', 'C1FHtLrwQGvYvHEj', 'xlVpxXlwLDBkigNr', 'jZ6KNRkZJbhIFTUH', 'k9jeCoWPx2z9Q3WU', '6JuLFPWO21xzKgbc', 'RYdmLnFJOm9YjMjc', '5yFFxnSZdYE1NWYM', 'sY80sj7X5MD0mH2A'],
        enhanced: ['MSHO9s465zhZIuH7', 'lQkXSdxvO9CRxohD', '9hB3ZY7buScJPXEy', '3Nat4ImT49niZUdr', 'BDb75TAOyhTzNzte', 'N4Gsv8cBg1oK6EGS', 'Y4pI9rvbaVvmK2kn', 'B9O44gBwHIUTRasQ', '2bM6K9jKWHJoYURa', 'lKRTHUBDXYzwd80e', 'MrRFPOICNcpBbfca', 'Z5ExlCWEpqm0SMe1', 'kxMIly2TCSidrRf1', 'SkPDNmMoL4M4r1it', 'o3zbh5CXtTQiWKwZ', '3Z2uyLiembwA6fft', 'pRvx3DZRnH50eV6d']
      }
    },
    activateScene: {
      label: "Activate Initial Scene",
      default: true,
      handler: (adventure, option, enabled) => {
        if ( !enabled ) return;
        return game.scenes.get(option.sceneId)?.activate();
      },
      sceneId: "MSHO9s465zhZIuH7"
    },
    displayJournal: {
      label: "Display Introduction Journal Entry",
      default: true,
      handler: (adventure, option, enabled) => {
        if ( !enabled ) return;
        return game.journal.get(option.entryId)?.sheet.render(true);
      },
      entryId: "2Q0QtLA7FQYcMMD9"
    },
    customizeJoin: {
      label: "Customize World Details",
      default: false,
      background: "modules/pf2e-abomination-vaults/assets/journal-images/vignettes/av-cover.webp",
      handler: async (adventure, option, enabled) => {
        if ( !enabled ) return;
        const module = game.modules.get("pf2e-abomination-vaults");
        const worldData = {
          action: "editWorld",
          name: game.world.data.name,
          description: module.data.description,
          background: option.background
        }
        await fetchJsonWithTimeout(foundry.utils.getRoute("setup"), {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(worldData)
        });
        game.world.data.update(worldData);
      }
    }
  }
};

export default {
  moduleId: "pf2e-abomination-vaults",
  packName: "av",
  journalFlag: "isAV",
  cssClass: "pf2e-av",
  adventure: ABOMINATION_VAULTS,
  languages: ["en"]
}
